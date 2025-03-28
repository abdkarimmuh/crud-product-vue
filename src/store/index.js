import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ],
  },
  mutations: {
    SET_PRODUCT(state, product) {
      state.products = product.map((x) => ({
        id: x.id,
        title: x.title,
        price: parseInt(x.price),
        description: x.description,
        category: x.category,
      }));
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter((p) => p.id !== productId);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        commit("SET_PRODUCT", response.data);
      } catch (error) {
        console.error("Error get products:", error);
      }
    },
    addProduct({ commit, state }, product) {
      commit("ADD_PRODUCT", {
        ...product,
        id: state.products.length + 1,
      });
    },
    updateProduct({ commit }, product) {
      commit("UPDATE_PRODUCT", product);
    },
    deleteProduct({ commit }, productId) {
      commit("DELETE_PRODUCT", productId);
    },
  },
  getters: {
    allProducts: (state) => state.products,
    getProductById: (state) => (id) => state.products.find((p) => p.id === id),
    allCategories: (state) => state.categories,
  },
  plugins: [createPersistedState()], // Tambahkan plugin persist state
});
