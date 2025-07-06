import { setActivePinia, createPinia } from 'pinia'
import { useBarangStore } from '../src/stores/barangStore'

test('store barang awalnya kosong', () => {
  setActivePinia(createPinia())
  const store = useBarangStore()
  expect(store.daftarBarang).toEqual([])
})
