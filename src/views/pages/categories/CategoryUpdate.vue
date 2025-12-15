<template>
    <h3>Update Category</h3>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="item.name">
        </div>
        <div class="mb-3">
            <!-- <input type="checkbox" class="form-check-input" v-model="item.is_inactive" v-bind:checked="item.is_inactive" id="chkActive">&nbsp;
            <label class="form-check-label" for="chkActive">Active</label> -->
            <input type="checkbox" class="form-check-input" v-model="item.is_inactive" :true-value="0" :false-value="1" id="chkActive">&nbsp;
            <label class="form-check-label" for="chkActive">Active</label>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</template>

<script setup lang="ts">
import { api } from '@/config/api';
import { defaultCategory, type Category } from '@/interfaces/Category';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const id = route.params.id;
let item = ref<Category>(defaultCategory);

function handleSubmit() {
    // console.log(item.value.name);
    // console.log(item.value.is_inactive);
    // axios.put(`http://127.0.0.1:8000/api/categories/${id}`, item.value)
    // .then(response => {
    //     console.log(response.data);     // Updated through raw data or JSON not form data
    // })
    // .catch(error => {
    //     console.log(error);
    // });

    let formData = new FormData();
    formData.append('name', item.value.name);
    formData.append('is_inactive', item.value.is_inactive.toString());     // formData only accepts string values
    formData.append('_method', 'PUT');                                     // For Laravel to recognize as PUT request

    api.post(`http://127.0.0.1:8000/api/categories/${id}`, formData)     //for form data use post with _method as PUT
    .then(response => {
        console.log("Updated", response.data);
    })
    .catch(error => {
        console.log(error);
        console.log(error.status);
        if(error.response.data.message) {
            alert(error.response.data.message);
        }
    });
}

api.get(`http://127.0.0.1:8000/api/categories/${id}`)
    .then(response => {
        // console.log(response.data);
        item.value = response.data.data;
        // item.value.is_inactive = !item.value.is_inactive;       // Adjusting for checkbox binding
    })
    .catch(error => {
        console.log(error);
    });
</script>

<style scoped></style>