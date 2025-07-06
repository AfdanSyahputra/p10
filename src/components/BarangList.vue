<template>
  <div>
    <h2>📦 Daftar Barang</h2>

    <FilterBarang
      v-model:keyword="barangStore.keyword"
      v-model:kategori="barangStore.kategori"
      @hapus-semua="barangStore.hapusSemuaBarang"
    />

    <BarangStokLow />

    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Stok</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="barang in barangStore.barangTersaring" :key="barang.id">
          <td>{{ barang.nama }}</td>
          <td>{{ barang.kategori }}</td>
          <td>{{ barang.stok }}</td>
          <td>Rp{{ barang.harga }}</td>
          <td>
            <button @click="editBarang(barang.id)">Edit</button>
            <button @click="barangStore.hapusBarang(barang.id)">Hapus</button>
            <button @click="tambahKeKeranjang(barang)">+ Keranjang</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Keranjang />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBarangStore } from '../stores/barangStore'
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'
import FilterBarang from './FilterBarang.vue'
import BarangStokLow from './BarangStokLow.vue'
import Keranjang from './Keranjang.vue'

const barangStore = useBarangStore()
const cartStore = useCartStore()
const router = useRouter()

onMounted(() => {
  barangStore.fetchBarang()
})

function editBarang(id) {
  router.push(`/dashboard/edit/${id}`)
}

function tambahKeKeranjang(barang) {
  cartStore.tambahKeKeranjang(barang)
}
</script>
