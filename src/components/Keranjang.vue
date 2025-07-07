<script setup>
import { useCartStore } from '../stores/cartStore'
import { useBarangStore } from '../stores/barangStore'
import axios from 'axios'

// ✅ Ganti URL ke backend Render
const BASE_URL = 'https://pbk-warung-api.onrender.com/api'

const cart = useCartStore()
const barangStore = useBarangStore()

function hapusItem(id) {
  cart.hapusDariKeranjang(id)
}

async function bayarSekarang() {
  if (cart.items.length === 0) {
    alert('Keranjang kosong!')
    return
  }

  const transaksi = {
    items: cart.items,
    total: cart.total,
    waktu: new Date().toISOString()
  }

  try {
    // 1. Simpan transaksi
    await axios.post(`${BASE_URL}/transaksi`, transaksi)

    // 2. Kurangi stok setiap barang
    for (const item of cart.items) {
      const res = await axios.get(`${BASE_URL}/barang/${item.id}`)
      const barangAsli = res.data

      const stokBaru = barangAsli.stok - item.jumlah
      if (stokBaru < 0) {
        alert(`Stok barang "${barangAsli.nama}" tidak cukup!`)
        return
      }

      await axios.put(`${BASE_URL}/barang/${item.id}`, {
        ...barangAsli,
        stok: stokBaru
      })

      // Sync store barang lokal
      const lokal = barangStore.daftarBarang.find(b => b.id === item.id)
      if (lokal) lokal.stok = stokBaru
    }

    cart.kosongkanKeranjang()
    alert('Pembayaran berhasil!')

  } catch (err) {
    console.error('❌ Gagal saat bayar:', err.response?.data || err.message)
    alert('Terjadi kesalahan saat transaksi!')
  }
}
</script>
