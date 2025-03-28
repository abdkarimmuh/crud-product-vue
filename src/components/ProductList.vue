<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ handlingTitle(product.title) }}</td>
          <td>{{ handlingDesc(product.description) }}</td>
          <td>${{ product.price }}</td>
          <td :class="getCategoryClass(product.category)">
            {{ product.category }}
          </td>
          <td>
            <router-link
              :to="`/products/edit/${product.id}`"
              class="btn btn-sm btn-warning me-2"
              >Edit</router-link
            >
            <button
              @click="deleteProduct(product.id)"
              class="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
export default {
  name: "ProductList",
  computed: {
    products() {
      return this.$store.getters["allProducts"];
    },
  },
  methods: {
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    handlingTitle(title) {
      if (title.length > 17) {
        return title.slice(0, 20) + "...";
      }
      return title;
    },
    handlingDesc(description) {
      if (description.length > 47) {
        return description.slice(0, 50) + "...";
      }
      return description;
    },
    getCategoryClass(category) {
      switch (category) {
        case "electronics":
          return "text-primary";
        case "jewelery":
          return "text-secondary";
        case "men's clothing":
          return "text-success";
        case "women's clothing":
          return "text-danger";
        default:
          return "text-black";
      }
    },
  },
};
</script>