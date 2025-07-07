import { defineStore } from 'pinia'
import axios from 'axios'

// ✅ Gunakan API dari Render
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
      if (this.items.length === 0) return alert('Keranjang kosong.')

      const total = this.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
      const transaksi = {
        waktu: new Date().toISOString(),
        items: this.items,
        total
      }

      try {
        // ✅ Simpan transaksi
        await axios.post(`${BASE_URL}/transaksi`, transaksi)
        console.log('✅ Transaksi berhasil disimpan.')

        // ✅ Update stok setiap item
        for (const item of this.items) {
          try {
            const res = await axios.get(`${BASE_URL}/barang/${item.id}`)

            if (!res.data || typeof res.data.stok !== 'number') {
              console.warn(`⚠️ Barang tidak valid atau tidak ditemukan: ${item.nama}`)
              continue
            }

            const stokBaru = res.data.stok - item.jumlah
            if (stokBaru >= 0) {
              await axios.patch(`${BASE_URL}/barang/${item.id}`, {
                stok: stokBaru
              })
              console.log(`🛠️ Stok ${item.nama} berhasil dikurangi.`)
            } else {
              console.warn(`⚠️ Stok ${item.nama} tidak cukup.`)
            }
          } catch (err) {
            console.error(`❌ Gagal update stok untuk ${item.nama}:`, err.response?.data || err.message)
          }
        }

        this.kosongkanKeranjang()
        alert('Transaksi berhasil!')
      } catch (err) {
        console.error('❌ Gagal simpan transaksi:', err.response?.data || err.message)
        alert('Terjadi kesalahan saat transaksi!')
      }
    }
  },
  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
  }
})
