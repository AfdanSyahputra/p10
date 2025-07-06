import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://7c96bf74-0a54-41c7-9233-64b5217055e6-00-3l7bhrm1fgkrm.pike.replit.dev'

export const useBarangStore = defineStore('barang', {
  state: () => ({
    daftarBarang: [],
    keyword: '',
    kategori: ''
  }),
  actions: {
    async fetchBarang() {
      try {
        const res = await axios.get(`${BASE_URL}/barang`)
        this.daftarBarang = res.data
      } catch (error) {
        console.error('Gagal fetch barang:', error)
      }
    },
    async hapusBarang(id) {
      await axios.delete(`${BASE_URL}/barang/${id}`)
      this.daftarBarang = this.daftarBarang.filter(b => b.id !== id)
    },
    async hapusSemuaBarang() {
      const promises = this.daftarBarang.map(b =>
        axios.delete(`${BASE_URL}/barang/${b.id}`)
      )
      await Promise.all(promises)
      this.daftarBarang = []
    },
    async tambahBarang(barang) {
      try {
        const res = await axios.post(`${BASE_URL}/barang`, barang)
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
