<template>
    <h3>Posts List</h3>
    <router-link to="/post/create" class="btn btn-primary mb-3">Create Post</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th><i class="fa-regular fa-user"></i>User ID</th>
                <th>Title</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>aff</td>
                <td>
                    <button class="btn btn-sm btn-outline-success me-2"><i
                            class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn btn-sm btn-outline-info me-2"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
            <tr v-for="post in posts" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.userId }}</td>
                <td>{{ post.title }}</td>
                <td>
                    <button class="btn btn-sm btn-outline-success me-2"><i
                            class="fa-regular fa-pen-to-square"></i></button>
                    <router-link :to="`/post/${post.id}/details/${post.userId}`"
                        class="btn btn-sm btn-outline-info me-2"><i class="fa-solid fa-eye"></i></router-link>
                    <button @click="deletePost(post.id)" class="btn btn-sm btn-outline-danger">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios from 'axios';
import type { PostFake } from '@/interfaces/PostFakeInterface';

// let posts = ref<PostFake[]>([]);
let posts = reactive<PostFake[]>([]);
axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        // posts.value = response.data;
        posts.push(...response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })

function deletePost(id: number) {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => console.log("Deleted:", id))
        .catch(err => console.log(err));
}

</script>

<style scoped></style>