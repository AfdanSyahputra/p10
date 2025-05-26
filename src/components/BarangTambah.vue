<template>
  <div class="barang-tambah">
    <h2>Tambah Barang</h2>
    <form @submit.prevent="tambahBarang">
      <div>
        <label>Nama Barang:</label>
        <input type="text" v-model="barang.nama" required />
      </div>
      <div>
        <label>Harga:</label>
        <input type="number" v-model="barang.harga" required />
      </div>
      <div>
        <label>Stok:</label>
        <input type="number" v-model="barang.stok" required />
      </div>
      <div>
        <label>Gambar:</label>
        <input type="file" @change="previewGambar" accept="image/*" />
        <div v-if="gambarPreview">
          <p>Preview:</p>
          <img :src="gambarPreview" alt="Preview Gambar" style="max-width: 200px; margin-top: 10px" />
        </div>
      </div>
      <button type="submit">Simpan</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barang: {
        nama: '',
        harga: '',
        stok: '',
        gambar: null,
      },
      gambarPreview: null,
    };
  },
  methods: {
    previewGambar(event) {
      const file = event.target.files[0];
      if (file) {
        this.barang.gambar = file;
        const reader = new FileReader();
        reader.onload = e => {
          this.gambarPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    tambahBarang() {
      if (!this.barang.nama || !this.barang.harga || !this.barang.stok) {
        alert('Semua data barang wajib diisi.');
        return;
      }

      // Simulasi proses simpan
      setTimeout(() => {
        alert('Barang berhasil ditambahkan!');
        // Reset form
        this.barang = { nama: '', harga: '', stok: '', gambar: null };
        this.gambarPreview = null;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.barang-tambah {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
label {
  display: block;
  margin-top: 1rem;
}
input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
