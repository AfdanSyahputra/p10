import { defineStore } from 'pinia'
import axios from 'axios'

// ✅ Ganti URL Replit ke Render
const BASE_URL = 'https://pbk-warung-api.onrender.com/api'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    tambahKeKeranjang(barang) {
      const existing = this.items.find(item => item.id === barang.id)
      if (existing) {
        existing.jumlah++
      } else {
        this.items.push({ ...barang, jumlah: 1 })
      }
    },
    hapusDariKeranjang(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    kosongkanKeranjang() {
      this.items = []
    },
    async bayar() {
      if (this.items.length === 0) return

      const total = this.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
      const transaksi = {
        waktu: new Date().toISOString(),
        items: this.items,
        total
      }

      try {
        // Simpan transaksi
        await axios.post(`${BASE_URL}/transaksi`, transaksi)

        // Update stok setiap barang
        for (const item of this.items) {
          const res = await axios.get(`${BASE_URL}/barang/${item.id}`)
          const stokSekarang = res.data.stok
          const stokBaru = stokSekarang - item.jumlah

          if (stokBaru >= 0) {
            await axios.patch(`${BASE_URL}/barang/${item.id}`, {
              stok: stokBaru
            })
          }
        }

        this.kosongkanKeranjang()
        alert('Transaksi berhasil!')
      } catch (err) {
        console.error('❌ Gagal saat transaksi:', err.response?.data || err.message)
        alert('Terjadi kesalahan saat transaksi!')
      }
    }
  },
  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
  }
})
