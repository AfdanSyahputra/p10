<template>
  <div>
    <h3>📊 Barang per Kategori</h3>
    <canvas id="kategoriChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'
import { useBarangStore } from '../stores/barangStore'

const barangStore = useBarangStore()

onMounted(() => {
  const ctx = document.getElementById('kategoriChart')
  const data = barangStore.kategoriStatistik
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Jumlah Barang',
        data: Object.values(data),
        backgroundColor: '#007bff'
      }]
    }
  })
})
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin-top: 10px;
}
</style>
