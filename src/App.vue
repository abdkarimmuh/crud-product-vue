<template>
  <div id="app">
    <NavBar />
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
/* Add any global styles here */
</style>