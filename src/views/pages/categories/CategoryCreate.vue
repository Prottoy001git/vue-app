<template>
    <h3>Create Category</h3>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="post.name">
        </div>
        <div class="mb-3">
            <input type="checkbox" class="form-check-input" v-model="post.is_inactive" id="chkActive">&nbsp;
            <label class="form-check-label" for="chkActive">Active</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { defaultCategory, type Category } from '@/interfaces/Category';
import type { PostCreate } from '@/interfaces/PostCreate';
import axios from 'axios';
import { reactive, ref } from 'vue';

const post = ref<Category>(defaultCategory);

function handleSubmit() {
    // console.log(post.value.name);
    // console.log(post.value.is_inactive);
    let is_inactive = post.value.is_inactive ? 0 : 1;

    // Using form data 
    let formData = new FormData();
    formData.append('name', post.value.name);
    formData.append('is_inactive', is_inactive.toString());     // formData only accepts string values

    axios.post('http://127.0.0.1:8000/api/categories', formData)
        .then(response => {
            console.log("Created", response.data);
            console.log("Status Code", response.status);
            if (response.status === 201) {
                post.value.name = '';
                post.value.is_inactive = false;
                alert('Category Created Successfully');
            }
        })
        .catch(error => {
            console.log(error);
        });
}
</script>

<style scoped></style>