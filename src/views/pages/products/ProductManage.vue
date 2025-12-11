<template>
    <h3>Products List</h3>
    <router-link to="/product/create" class="btn btn-success mb-3">Create Product</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{ item.id }}</td>
                <td>
                    <img v-if="item.photo == null" src="https://placehold.co/60" alt="Image" class="rounded">
                    <img v-else :src="baseURL + item.photo" alt="Image" class="rounded" width="60">
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                    <router-link :to="`/products/${item.id}`" class="btn btn-sm btn-outline-success me-2"><i
                            class="fa-regular fa-pen-to-square"></i></router-link>
                    <!-- <router-link :to="`/post/${post.id}/details/${post.userId}`"
                        class="btn btn-sm btn-outline-info me-2"><i class="fa-solid fa-eye"></i></router-link> -->
                    <button class="btn btn-sm btn-outline-danger">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { api } from '@/config/api';
import type { Product } from '@/interfaces/Products';
import { ref } from 'vue';
import {baseURL} from '@/config/baseURL';

const products = ref<Product[]>([]);
api.get('products')
    .then(response => {
        // console.log(response.data);
        products.value = response.data;
    })
    .catch(error => {
        console.log(error);
    });
</script>



<style scoped>


</style>