import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://7c96bf74-0a54-41c7-9233-64b5217055e6-00-3l7bhrm1fgkrm.pike.replit.dev'

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
        await axios.post(`${BASE_URL}/transaksi`, transaksi)

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
        console.error('Gagal saat transaksi:', err)
        alert('Terjadi kesalahan saat transaksi!')
      }
    }
  },
  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
  }
})
