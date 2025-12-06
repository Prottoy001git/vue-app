<template>
    <h3>Create Post</h3>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="post.title">
        </div>
        <div class="mb-3">
            <label class="form-label">Body</label>
            <textarea class="form-control" id="body" v-model="post.body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script setup lang="ts">
import type { PostCreate } from '@/interfaces/PostCreate';
import axios from 'axios';
import { reactive } from 'vue';

const post = reactive<PostCreate>({
    title: '',
    body: ''
});

function handleSubmit() {
    // console.log(post.title);
    // console.log(post.body);
    axios.post('https://jsonplaceholder.typicode.com/posts', post)
    .then(response => {
            console.log("Created", response.data);
        })
        .catch(error => {
            console.log(error);
        });
}
</script>

<style scoped>

</style>