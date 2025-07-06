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
    await axios.post('http://localhost:3000/transaksi', transaksi)

    // 2. Kurangi stok setiap barang
    for (const item of cart.items) {
      // Ambil barang asli dari server
      const res = await axios.get(`http://localhost:3000/barang/${item.id}`)
      const barangAsli = res.data

      // Hitung stok baru
      const stokBaru = barangAsli.stok - item.jumlah
      if (stokBaru < 0) {
        alert(`Stok barang "${barangAsli.nama}" tidak cukup!`)
        return
      }

      // Update ke server
      await axios.put(`http://localhost:3000/barang/${item.id}`, {
        ...barangAsli,
        stok: stokBaru
      })

      // Sync lokal store barang
      const lokal = barangStore.daftarBarang.find(b => b.id === item.id)
      if (lokal) lokal.stok = stokBaru
    }

    // 3. Bersihkan keranjang
    cart.kosongkanKeranjang()

    alert('Pembayaran berhasil!')

  } catch (err) {
    console.error('Gagal saat bayar:', err)
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
