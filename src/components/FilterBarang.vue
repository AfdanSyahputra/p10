<template>
  <div class="filter-barang">
    <input
      type="text"
      v-model="keyword"
      placeholder="Cari barang..."
      @input="$emit('update:keyword', keyword)"
    />
    <select v-model="kategori" @change="$emit('update:kategori', kategori)">
      <option value="">Semua Kategori</option>
      <option value="Makanan">Makanan</option>
      <option value="Minuman">Minuman</option>
      <option value="Rokok">Rokok</option>
    </select>
    <button class="hapus-semua" @click="$emit('hapus-semua')">🗑 Hapus Semua</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const keyword = ref('')
const kategori = ref('')
</script>

<style scoped>
.filter-barang {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
input, select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 150px;
}
.hapus-semua {
  background-color: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.hapus-semua:hover {
  background-color: #b02a37;
}
</style>
