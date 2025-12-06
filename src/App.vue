<script setup>
import Navbar from './views/layouts/Navbar.vue'
// import Pricing from './views/pages/Pricing.vue'
// import ComparePlans from './views/pages/ComparePlans.vue'
import Footer from './views/layouts/Footer.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="container py-3">
    <Navbar />
    <main>
      <router-view></router-view>
      <!-- <RouterView /> -->
      <!-- <Pricing />
      <ComparePlans /> -->
    </main>
  <Footer />
  </div>
</template>

<style></style>
