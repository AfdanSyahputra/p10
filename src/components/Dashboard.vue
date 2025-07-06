<template>
  <div class="dashboard">
    <h1>📦 Dashboard Warung Madura</h1>

    <nav class="nav">
      <router-link to="/dashboard/barang" class="nav-link" active-class="active-link">📋 Daftar Barang</router-link>
      <router-link to="/dashboard/tambah" class="nav-link" active-class="active-link">➕ Tambah Barang</router-link>
      <router-link to="/dashboard/transaksi" class="nav-link" active-class="active-link">🧾 Transaksi</router-link>
    </nav>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  padding: 20px;
  background: #ffffff;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.2s;
  display: inline-block;
}

.nav-link:hover {
  background-color: #0056b3;
}

.active-link {
  background-color: #6610f2 !important;
}

.content {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  min-height: 400px;
}
</style>
