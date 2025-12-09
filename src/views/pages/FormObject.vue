<template>
    <h2>Form 2</h2>
    <p>Here we will try to store object data in local storage. Also if updated through form submission, the updated value will be available to show in any page or components..</p>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="">ID</label>
            <input type="number" class="form-control" v-model="user.id">
        </div>
        <div class="mb-3">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="user.name">
        </div>
        <div class="mb-3">
            <button type="submit" class="btn btn-success">Update Value</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { ref } from 'vue';
const userData = useUserStore();

interface User {                         // sets the type of the input data
    id: number;
    name: string;
}
const user = ref<User>(userData.user)    // sets the default value of the input data
console.log();

function handleSubmit() {
    console.log(user.value);            // check if updated value is being submitted and shows the updated value in console 
    userData.user = user.value;         // assigns the updated value to the state
    userData.setLocal();                // set the updated value in local storage
}
</script>

<style scoped>

</style>