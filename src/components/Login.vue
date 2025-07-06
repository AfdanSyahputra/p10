<template>
  <div class="login-container">
    <div class="login-box">
      <h2>🔐 Login Admin</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    router.push('/dashboard')
  } else {
    error.value = '❌ Username atau password salah!'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #dfe9f3, #ffffff);
}

.login-box {
  background: white;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

.login-box h2 {
  margin-bottom: 20px;
  color: #333;
}

.login-box input {
  width: 100%;
  padding: 12px 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.login-box button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.login-box button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 12px;
  color: red;
  font-size: 14px;
}
</style>
