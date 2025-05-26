<template>
  <div class="barang-list">
    <h2>Daftar Barang</h2>
    <p>Menampilkan semua barang di Warung Madura.</p>

    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Stok</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(barang, index) in daftarBarang" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ barang.nama }}</td>
          <td>{{ barang.stok }}</td>
          <td>
            <router-link :to="`/barang/edit/${barang.id}`">
              <button>Edit</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daftarBarang: [
        { id: 1, nama: 'Indomie', stok: 30 },
        { id: 2, nama: 'Susu', stok: 15 },
        { id: 3, nama: 'Kopi', stok: 40 },
      ],
    };
  },
};
</script>

<style scoped>
.barang-list {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  padding: 0.3rem 0.75rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>