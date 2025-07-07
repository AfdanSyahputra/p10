<template>
  <div class="keranjang">
    <h3>🛒 Keranjang Belanja</h3>

    <ul v-if="cart.items.length > 0">
      <li v-for="item in cart.items" :key="item.id">
        {{ item.nama }} ({{ item.jumlah }}) - Rp{{ item.harga * item.jumlah }}
        <button @click="hapusItem(item.id)">Hapus</button>
      </li>
    </ul>

    <p v-else>Keranjang kosong.</p>

    <p><strong>Total: Rp{{ cart.total }}</strong></p>

    <button
      class="bayar-btn"
      @click="bayarSekarang"
      :disabled="cart.items.length === 0"
    >
      💳 Bayar Sekarang
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { useBarangStore } from '../stores/barangStore'
import axios from 'axios'

// ✅ Gunakan backend Render
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

<style scoped>
.keranjang {
  background: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #b02a37;
}
.bayar-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.bayar-btn:hover {
  background-color: #218838;
}
.bayar-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
