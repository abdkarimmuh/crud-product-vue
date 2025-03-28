<template>
  <div>
    <h2 v-if="isEdit">Edit Product</h2>
    <h2 v-else>Add New Product</h2>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="product.title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="product.description"
          rows="3"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="product.price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select v-model="product.category" class="form-control">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link to="/products" class="btn btn-secondary ms-2"
        >Cancel</router-link
      >
    </form>
  </div>
</template>
  
<script>
export default {
  name: "ProductForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    productId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      product: {
        id: null,
        title: "",
        description: "",
        price: 0,
        category: "",
      },
    };
  },
  computed: {
    categories() {
      return this.$store.getters["allCategories"];
    },
  },
  created() {
    if (this.isEdit && this.productId) {
      const existingProduct = this.getProductById(Number(this.productId));
      if (existingProduct) {
        this.product = { ...existingProduct };
      }
    }
  },
  methods: {
    getProductById(id) {
      return this.$store.getters["getProductById"](id);
    },
    handleSubmit() {
      if (this.isEdit) {
        this.$store.dispatch("updateProduct", this.product);
      } else {
        this.$store.dispatch("addProduct", this.product);
      }
      this.$router.push("/products");
    },
  },
};
</script>