<script>

// In this style everything is written in setup function 
// variables and functions are defined inside setup and returned to use in template
// If not returned then they cant be used in template

export default {
  setup() {
    const title = 'New Title';
    const desc = 'Welcome to IsDB , WDPF-65';
    const round = true;
    const trainees = ['Roxi', 'Shah-Alom', 'Farhana'];
    const link = 'https://vuejs.org/';
    const test = () => {
      alert("Test Clicked");
    }
    return { title, desc, round, trainees, link, test }   // must return to use in template
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <!-- prints the returned data -->
      <h1>{{ title }}</h1>
    </div>
  </header>

  <main>
    <!-- prints the returned data -->
    <p>{{ desc }}</p>
    <p>Round:
      <!-- if else syntax is written like this v-if v-else -->
      <span v-if="round">Active</span>
      <span v-else="round">Inactive</span>
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
    <button type="button" @click="test">Click to Test</button>
  </main>
</template>

<style scoped>
:global(#app) {
  display: flex;
  flex-direction: column;  /* forces top-bottom */
}

header {
  line-height: 1.5;
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
