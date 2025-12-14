<script setup>
import Navbar from './views/layouts/Navbar.vue'
// import Pricing from './views/pages/Pricing.vue'
// import ComparePlans from './views/pages/ComparePlans.vue'
import Footer from './views/layouts/Footer.vue'
import { RouterView, useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="container py-3">
    <Navbar v-if="!route.meta.noLayout" />
    <main>
      <router-view></router-view>
      <!-- <RouterView /> -->
      <!-- <Pricing />
      <ComparePlans /> -->
    </main>
    <Footer v-if="!route.meta.noLayout" />
  </div>
</template>

<style></style>
