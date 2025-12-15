<template>
    <h3>Category List</h3>
    <router-link to="/category/create" class="btn btn-success mb-3">Create Category</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th><i class="fa-regular fa-user"></i>Name</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td>
                    <span class="badge" :class="!category.is_inactive ? 'bg-success' : 'bg-danger'">
                        {{ !category.is_inactive ? 'Active' : 'Inactive' }}
                    </span>
                </td>

                <td>
                    <router-link :to="`/category/update/${category.id}`" class="btn btn-sm btn-outline-success me-2"><i
                            class="fa-regular fa-pen-to-square"></i></router-link>
                    <!-- <router-link :to="`/post/${post.id}/details/${post.userId}`"
                        class="btn btn-sm btn-outline-info me-2"><i class="fa-solid fa-eye"></i></router-link> -->
                    <button @click="deleteCategory(category.id)" class="btn btn-sm btn-outline-danger">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { api } from '@/config/api';
import type { Category } from '@/interfaces/Category';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let categories = ref<Category[]>([]);

function fetchCategories() {
    api.get('http://127.0.0.1:8000/api/categories')
        .then(response => {
            categories.value = response.data.data;
            // console.log(response.data);
            if (categories.value.length === 0) {      // Redirect if no categories
                router.push('/');
            }
        })
        .catch(error => {
            console.log(error);
        })
};

fetchCategories();      // Initial fetch of data

function deleteCategory(id: number) {
    api.delete(`http://127.0.0.1:8000/api/categories/${id}`)
    .then(() => {
        console.log("Deleted: ", id);
        fetchCategories();   // Refresh the list after deletion
    })
    .catch(err => console.log(err));
}

</script>

<style scoped></style>