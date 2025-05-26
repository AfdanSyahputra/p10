<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <p><center>Selamat datang di sistem Warung Madura</center></p>

    <div class="navigasi">
      <router-link to="/barang/tambah">
        <button>Tambah Barang</button>
      </router-link>
      <router-link to="/barang">
        <button>Lihat Daftar Barang</button>
      </router-link>
    </div>

    <div class="statistik">
      <div class="stat-card">
        <h3>{{ jumlahBarang }}</h3>
        <p>Total Barang</p>
      </div>
      <div class="stat-card">
        <h3>{{ totalStok }}</h3>
        <p>Total Stok</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barangList: [
        { nama: 'Indomie', stok: 30 },
        { nama: 'Susu', stok: 15 },
        { nama: 'Kopi', stok: 40 },
      ],
    };
  },
  computed: {
    jumlahBarang() {
      return this.barangList.length;
    },
    totalStok() {
      return this.barangList.reduce((total, item) => total + item.stok, 0);
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.navigasi {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.statistik {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
.stat-card {
  flex: 1;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.stat-card h3 {
  margin: 0;
  font-size: 2rem;
  color: #2196f3;
}
</style>
