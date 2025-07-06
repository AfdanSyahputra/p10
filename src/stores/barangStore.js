import { defineStore } from 'pinia'
import axios from 'axios'

export const useBarangStore = defineStore('barang', {
  state: () => ({
    daftarBarang: [],
    keyword: '',
    kategori: ''
  }),
  actions: {
    async fetchBarang() {
      try {
        const res = await axios.get('http://localhost:3000/barang')
        this.daftarBarang = res.data
      } catch (error) {
        console.error('Gagal fetch barang:', error)
      }
    },
    async hapusBarang(id) {
      await axios.delete(`http://localhost:3000/barang/${id}`)
      this.daftarBarang = this.daftarBarang.filter(b => b.id !== id)
    },
    async hapusSemuaBarang() {
      const promises = this.daftarBarang.map(b =>
        axios.delete(`http://localhost:3000/barang/${b.id}`)
      )
      await Promise.all(promises)
      this.daftarBarang = []
    },
    
    // ✅ Tambah Barang (baru)
    async tambahBarang(barang) {
      try {
        const res = await axios.post('http://localhost:3000/barang', barang)
        this.daftarBarang.push(res.data)
      } catch (err) {
        console.error('Gagal tambah barang:', err)
      }
    }
  },
  getters: {
    barangTersaring: (state) => {
      return state.daftarBarang.filter(b => {
        const cocokNama = b.nama.toLowerCase().includes(state.keyword.toLowerCase())
        const cocokKategori = state.kategori ? b.kategori === state.kategori : true
        return cocokNama && cocokKategori
      })
    },
    stokLow: (state) => state.daftarBarang.filter(b => b.stok < 10),
    kategoriStatistik: (state) => {
      const stats = {}
      state.daftarBarang.forEach(b => {
        stats[b.kategori] = (stats[b.kategori] || 0) + 1
      })
      return stats
    }
  }
})
