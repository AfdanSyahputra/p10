<template>
  <div class="transaksi-list">
    <h2>🧾 Riwayat Transaksi</h2>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Waktu</th>
          <th>Barang</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trx, index) in transaksi" :key="trx.id">
          <td>{{ index + 1 }}</td>
          <td>{{ new Date(trx.waktu).toLocaleString() }}</td>
          <td>
            <ul>
              <li v-for="item in trx.items" :key="item.id">
                {{ item.nama }} (x{{ item.jumlah }}) - Rp{{ item.harga * item.jumlah }}
              </li>
            </ul>
          </td>
          <td><strong>Rp{{ trx.total }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

// ✅ Ganti BASE_URL ke Render
const BASE_URL = 'https://pbk-warung-api.onrender.com/api'

const transaksi = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transaksi`)
    transaksi.value = res.data
  } catch (err) {
    console.error('❌ Gagal mengambil transaksi:', err.response?.data || err.message)
  }
})
</script>

<style scoped>
.transaksi-list {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 900px;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  margin-top: 10px;
}

th {
  background-color: #007bff;
  color: white;
  padding: 12px;
  text-align: left;
}

td {
  padding: 12px;
  border: 1px solid #ddd;
  vertical-align: top;
}

td strong {
  font-size: 16px;
  color: #000;
}

ul {
  margin: 0;
  padding-left: 18px;
}

li {
  margin-bottom: 5px;
}
</style>
