<template>
    <h3>Post Details</h3>
    <p>Post ID: {{ route.params.id }}</p>
    <p>User ID: {{ route.params.userid }}</p>
    <div class="card">
        <div class="card-body">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">                    // lang="ts" is used to write Typescript code (use interfaces etc)
import defaultPostFake, { type PostFake } from '@/interfaces/PostFakeInterface';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';      // current route object values can be received using useRoute

let route = useRoute();
// let post = reactive<PostFake>(defaultPostFake);
let post = ref<PostFake>(defaultPostFake);


axios.get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
    .then(response => {
    console.log(response.data);
    // Object.assign(post, response.data);     // for reactive, object cannot be directly assigned, so use Object.assign
    post.value = response.data;             // for ref, object can be directly assigned using .value
})
    .catch(error => {
        console.log(error);
})
</script>


<style scoped></style>