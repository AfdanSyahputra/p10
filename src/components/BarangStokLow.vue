<template>
  <div class="stok-low">
    <h3>📉 Barang Hampir Habis</h3>
    <ul>
      <li v-for="barang in barangStore.stokLow" :key="barang.id">
        ⚠ {{ barang.nama }} (Stok: {{ barang.stok }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useBarangStore } from '../stores/barangStore'
const barangStore = useBarangStore()
</script>

<style scoped>
.stok-low {
  background: #fff8e1;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #f7d067;
  margin-bottom: 20px;
}
</style>
