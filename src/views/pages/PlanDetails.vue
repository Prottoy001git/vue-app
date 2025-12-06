<template>
    <div>
        <h1>Plan Details</h1>
        <h5>Plan: {{ currentPlan }}</h5>
        <p>This is the plan details page.</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';  // current route object values can be received using useRoute
const route = useRoute();
const currentPlan = route.params.id;
</script>

<style scoped>

</style>