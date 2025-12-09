<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { useUserStore } from '@/store/user';
import { ref } from 'vue';
const counter = useCounterStore();

// interface Counter {
//     count: number;
// }
const inputcount = ref(counter.count);

function formSubmit() {
    counter.count= inputcount.value;
    counter.setLocal();
}

const userData = useUserStore();
const user = ref(userData.user);
console.log(user.value);
</script>

<template>
    <h1>Welcome to Dashboard</h1>
    <h2>Counter: {{ counter.count }}</h2>
    <h5>This is <b>{{ counter.countResult }}</b> number.</h5>

    <div class="mt-3 btn-group">
        <button @click="counter.increment" class="btn btn-sm btn-outline-dark fs-4">+</button>
        <button @click="counter.decrement" class="btn btn-sm btn-outline-dark fs-4">&nbsp;-</button>
    </div>

    <div>
        <form @submit.prevent="formSubmit">
            <input type="number" v-model="inputcount">
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<style>

</style>