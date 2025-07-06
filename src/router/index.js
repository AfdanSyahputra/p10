// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import BarangList from '../components/BarangList.vue'
import BarangTambah from '../components/BarangTambah.vue'
import BarangEdit from '../components/BarangEdit.vue'

const routes = [
  { path: '/', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', redirect: '/dashboard/barang' },
      { path: 'barang', component: BarangList },
      { path: 'tambah', component: BarangTambah },
      { path: 'edit/:id', component: BarangEdit, props: true },
      { path: 'transaksi', component: () => import('../components/TransaksiList.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
