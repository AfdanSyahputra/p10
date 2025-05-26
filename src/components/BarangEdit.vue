<template>
  <div class="barang-edit">
    <h2>Edit Barang</h2>
    <form @submit.prevent="updateBarang">
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
      <button type="submit">Update</button>
      <button type="button" @click="resetForm" style="margin-left: 10px">Reset</button>
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
      barangAwal: null,
    };
  },
  mounted() {
    // Simulasi data barang dari backend (prefill)
    const dataBarang = {
      nama: 'Barang Contoh',
      harga: 50000,
      stok: 10,
    };
    this.barang = { ...dataBarang };
    this.barangAwal = { ...dataBarang };
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
    updateBarang() {
      // Simulasi proses update
      setTimeout(() => {
        alert('Barang berhasil diperbarui!');
        this.barangAwal = { ...this.barang };
      }, 1000);
    },
    resetForm() {
      this.barang = { ...this.barangAwal };
      this.gambarPreview = null;
    },
  },
};
</script>

<style scoped>
.barang-edit {
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
  padding: 0.75rem 1rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
