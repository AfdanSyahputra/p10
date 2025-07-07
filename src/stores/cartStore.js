import { defineStore } from 'pinia'
import axios from 'axios'

// Ganti URL ke backend Vercel
const BASE_URL = 'https://pbk-warung-api.vercel.app/api'

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
        // Simpan transaksi ke json-server (API Vercel)
        await axios.post(`${BASE_URL}/transaksi`, transaksi)
        console.log('✅ Transaksi berhasil disimpan.')
      } catch (err) {
        console.error('❌ Gagal simpan transaksi:', err)
        return
      }

      // Update stok barang
      for (const item of this.items) {
        try {
          const res = await axios.get(`${BASE_URL}/barang/${item.id}`)

          if (!res.data || typeof res.data.stok !== 'number') {
            console.warn(`⚠️ Barang tidak ditemukan di server: ID ${item.id}`)
            continue
          }

          const stokSekarang = res.data.stok
          const stokBaru = stokSekarang - item.jumlah

          if (stokBaru >= 0) {
            await axios.patch(`${BASE_URL}/barang/${item.id}`, { stok: stokBaru })
            console.log(`🛠️ Stok ${item.nama} berhasil dikurangi.`)
          } else {
            console.warn(`⚠️ Stok tidak cukup untuk barang: ${item.nama}`)
          }

        } catch (err) {
          console.error(`❌ Gagal update stok untuk ${item.nama}:`, err)
        }
      }

      // Kosongkan keranjang setelah transaksi selesai
      this.kosongkanKeranjang()
    }
  },
  getters: {
    total: (state) => state.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
  }
})
