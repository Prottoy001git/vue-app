<script>
export default {
  // data for returning values with variables 
  data() {
    return {
      title: 'IsDB - Welcome',
      desc: 'Welcome to IsDB , WDPF-65',
      round: true,
      trainees: ['Roxi', 'Shah-Alom', 'Farhana'],
      link: 'https://vuejs.org/'
    }
  },
  // methods for defining functions
  methods: {
    test() {
      alert('Method Working');
    },
    getTraineeInfo() {

    }
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
    <!-- Loop in vue is like this v-for -->
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
  flex-direction: column; /* forces top-bottom */
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

main{
  margin: 1.5rem auto;
  max-width: 800px;
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    /* display: flex;
    flex-direction: column; */
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
