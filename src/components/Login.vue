<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Username dan password wajib diisi';
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      try {
        // Simulasi login
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (this.username === 'admin' && this.password === 'admin') {
              resolve();
            } else {
              reject(new Error('Username atau password salah'));
            }
          }, 1500);
        });

        alert('Login berhasil!');
        // Redirect atau aksi lain bisa ditambahkan di sini
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
label {
  display: block;
  margin-top: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>