<script setup>
// import './assets/custom.css'    // link external css in script section
import Img from '/public/img2.jpg';
import { ref } from 'vue';

const title = 'IsDB - Welcome';
const desc = 'Welcome to IsDB , WDPF-65';
const round = ref(true);
const trainees = ['Roxi', 'Shah-Alom', 'Farhana'];
const link = 'https://vuejs.org/';
const test = () => {
  alert("Test Clicked");
}
const count = ref(0);
const increment = () => {
  count.value++;
}
const change = () => {
  // if(round.value){
  //   round.value = false;
  // } else {
  //   round.value = true;
  // }

  // round.value = round.value ? false : true;

  round.value = !round.value;
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <!-- prints the returned data -->
      <h1>{{ title }}</h1>
    </div>
    <h2>{{ count }}</h2>
    <button type="button" @click="increment" class="btn btn-info">Increment</button>
  </header>

  <section class="img-wrap">
    <!-- When loading from src or current location use ./ for current or ../ for one folder back -->
    <img src="./assets/images/img3.jpg" alt="Img">
    <!-- When loading from public folder use / to start from root directory -->
    <img src="/public/img1.jpeg" alt="Img">
    <!-- @ also starts from src folder  -->
    <img src="@/assets/images/img4.jpg" alt="Img">
    <!-- bind image using import -->
    <img :src="Img" alt="Img">
  </section>

  <main>
    <!-- prints the returned data -->
    <p>{{ desc }}</p>
    <p>Round:
      <!-- if else syntax is written like this v-if v-else -->
      <span v-if="round">Active</span>
      <span v-else="round">Inactive</span>
      <!-- <button type="button" @click="change">Change</button> -->

      <!-- Without using function directly use it here -->
      <button type="button" @click="round = !round" class="btn btn-primary">Change</button>
    </p>
    <!-- bind -->
    <!-- <a v-bind:href="link" target="_blank">Visit Website</a> -->
    <a :href="link" target="_blank">Visit Website</a>
    <!-- Loop in vue is like this (v-for) prints Array -->
    <ul>
      <!-- v-for="(can be any name) in (variable name)" :key="unique id" for printing....{{ key name }} -->
      <li v-for="trainee in trainees" :key="trainee">{{ trainee }}</li>
    </ul>
    <!-- to call function use @ sign (here @ is event listner) -->
    <button type="button" @click="test" class="btn btn-success">Click to Test</button>
  </main>
</template>

<style scoped>
/* Doesnt work with <style scoped> system.... */
/* Link external css in style section */
@import './assets/custom.css';   

:global(#app) {
  display: flex;
  flex-direction: column;
  /* forces top-bottom */
}

header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

main {
  margin: 1.5rem auto;
  max-width: 800px;
  text-align: center;
}

.img-wrap {
  width: 800px;
  display: flex;
  gap: 1rem;
  margin: 20px 0;
}
.img-wrap img {
  width: 200px;
  max-width: 25%;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
