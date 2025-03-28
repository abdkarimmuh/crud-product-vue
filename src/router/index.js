import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Products from "../views/ProductsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/products/add",
    name: "AddProduct",
    component: () => import("../components/ProductForm.vue"),
    props: { isEdit: false },
  },
  {
    path: "/products/edit/:id",
    name: "EditProduct",
    component: () => import("../components/ProductForm.vue"),
    props: (route) => ({ isEdit: true, productId: route.params.id }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
