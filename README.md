# CRUD Product Feature

## Objective
Membuat antarmuka sederhana untuk manajemen produk yang memungkinkan pengguna untuk:
1. **Menambahkan** produk baru (dengan nama dan harga).
2. **Mengedit** produk yang sudah ada.
3. **Menghapus** produk dari daftar.
4. **Melihat** daftar produk yang tersedia.

## Tech Stack
- **Framework**: Vue.js (Vue 2)
- **State Management**: Vuex
- **HTTP Client**: Axios
- **UI Framework**: Bootstrap

## Features
- **CRUD Produk** (Create, Read, Update, Delete)
- **State Management** menggunakan Vuex
- **Persistensi Data** agar produk tetap ada setelah refresh
- **Mengambil Data Awal** dari API publik menggunakan Axios
- **Tampilan Responsif** menggunakan Bootstrap

## Installation & Setup

1. **Clone Repository**
   ```sh
   git clone https://github.com/abdkarimmuh/crud-product-vue.git
   cd crud-product-vue
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm run serve
   ```

4. **Akses Aplikasi**
   Buka browser dan akses: `http://localhost:8080`

## Project Structure
```
|-- src/
|   |-- components/
|   |   |-- ProductList.vue    # Menampilkan daftar produk
|   |   |-- ProductForm.vue    # Form untuk tambah/edit produk
|   |-- store/
|   |   |-- index.js           # Vuex Store
|   |-- views/
|   |   |-- Home.vue           # Halaman utama
|-- App.vue                     # Root Component
|-- main.js                      # Entry Point
```

## API Integration
Aplikasi mengambil data produk awal dari **Fake Store API**:
- **Endpoint**: `https://fakestoreapi.com/products`
- **Method**: `GET`

Menggunakan Axios untuk mengambil data:
```js
async fetchProducts({ commit }) {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    commit('setProducts', response.data);
  } catch (error) {
    console.error('Gagal mengambil data produk:', error);
  }
}
```

## State Management (Vuex)
State produk disimpan di **Vuex** agar dapat diakses secara global dan tetap tersimpan setelah refresh menggunakan `vuex-persistedstate`.

```js
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) state.products.splice(index, 1, updatedProduct);
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products');
      commit('setProducts', response.data);
    }
  },
  plugins: [createPersistedState()]
});
```

## Bonus Features
✅ **Menggunakan API Publik** untuk data awal produk.  
✅ **Persistensi Data** agar produk tetap ada setelah refresh.  
✅ **Tampilan Responsif** dengan Bootstrap.  

## License
MIT License

---

Selamat mencoba dan happy coding! 🚀

