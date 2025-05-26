import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import BarangList from '../components/BarangList.vue';
import BarangTambah from '../components/BarangTambah.vue';
import BarangEdit from '../components/BarangEdit.vue';
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/barang',
    name: 'BarangList',
    component: BarangList
  },
  {
    path: '/barang/tambah',
    name: 'BarangTambah',
    component: BarangTambah
  },
  {
    path: '/barang/edit/:id',
    name: 'BarangEdit',
    component: BarangEdit,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
