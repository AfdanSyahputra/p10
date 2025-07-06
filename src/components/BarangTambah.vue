<template>
  <div class="form-container">
    <h2>Tambah Barang</h2>
    <form @submit.prevent="simpan" class="form">
      <label>Nama Barang:</label>
      <input v-model="nama" required />

      <label>Stok:</label>
      <input v-model.number="stok" type="number" required />

      <label>Harga:</label>
      <input v-model.number="harga" type="number" required />

      <label>Kategori:</label>
      <select v-model="kategori" required>
        <option disabled value="">Pilih Kategori</option>
        <option value="Makanan">Makanan</option>
        <option value="Minuman">Minuman</option>
        <option value="Rokok">Rokok</option>
      </select>

      <button type="submit">💾 Simpan</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBarangStore } from '../stores/barangStore'
import { useRouter } from 'vue-router'

const barangStore = useBarangStore()
const router = useRouter()

const nama = ref('')
const stok = ref(0)
const harga = ref(0)
const kategori = ref('')

// ✅ fungsi simpan wajib async dan pakai await
async function simpan() {
  console.log('Klik Simpan') // debug log
  await barangStore.tambahBarang({
    nama: nama.value,
    stok: stok.value,
    harga: harga.value,
    kategori: kategori.value
  })
  router.push('/dashboard/barang')
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}
button {
  padding: 10px;
  border: none;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background-color: #1f8c38;
}
</style>
