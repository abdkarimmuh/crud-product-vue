<template>
  <div>
    <h1>Product Management</h1>
    <template v-if="products.length > 0">
      <div class="mb-3">
        <router-link to="/products/add" class="btn btn-primary"
          >Add New Product</router-link
        >
      </div>
      <ProductList />
    </template>

    <div class="mb-3" v-else>
      <button class="btn btn-warning" @click="() => fetchProducts()">
        Fetch Products
      </button>
    </div>
  </div>
</template>
  
<script>
import ProductList from "@/components/ProductList.vue";

export default {
  name: "ProductsView",
  components: {
    ProductList,
  },
  computed: {
    products() {
      return this.$store.getters["allProducts"];
    },
  },
  methods: {
    async fetchProducts() {
      await this.$store.dispatch("fetchProducts");
    },
  },
};
</script>