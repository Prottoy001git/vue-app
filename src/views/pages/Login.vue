<template>
    <div>
        <h3 class="text-center pt-5">Login</h3>
        <div class="row pb-5">
            <form @submit.prevent="validation" class="col-lg-5 col-md-6 mx-auto">
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" class="form-control" v-model="user.email">
                    <span class="error-text text-danger">{{ errorMsg.email }}</span>
                </div>
                <div class="mb-3">
                    <label for="">Password</label>
                    <input type="password" class="form-control" v-model="user.password">
                    <span class="error-text text-danger">{{ errorMsg.password }}</span>
                </div>
                <div class="mt-4">
                    <button type="submit" class="btn btn-success w-100">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from '@/config/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({
    email: 'mina@mail.com',
    password: ''
});
const errorMsg = ref({
    email: '',
    password: ''
});

function handleSubmit() {
    // console.log(user.value);
    // alert('Form Submitted');
    api.post('login', user.value)
        .then((response) => {
            console.log(response.data);
            if(response.data.token) {
                if(response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    router.push('/');
                }
            }
        })
        .catch((error) => {
            console.log(error.response);
            // if (error.response.status == 422) {
            //     errorMsg.value.email = error.response.data.errors.email[0];
            //     errorMsg.value.password = error.response.data.errors.password[0];
            // }
            if(error.response.status == 401) {
                if(error.response.data.email) {
                    errorMsg.value.email = error.response.data.email;
                }else if (error.response.data.password) {
                    errorMsg.value.password = error.response.data.password;
                }
            }
        });
}

// **********************************************************
// ================= Client Side Validation =================
// **********************************************************
function validation() {
    // Email Validation
    const regexEmail = /^[a-zA-Z0-9._]{2,65}@[a-zA-Z0-9._]{2,65}.[a-zA-Z]{2,5}$/;

    if (user.value.email == '') {
        errorMsg.value.email = 'Email is required';
    } else if (!regexEmail.test(user.value.email)) {
        errorMsg.value.email = 'Email is invalid';
    } else {
        errorMsg.value.email = '';
    }
    // Password Validation
    if (user.value.password == '') {
        errorMsg.value.password = 'Password is required';
    } else {
        errorMsg.value.password = '';
    }
    // If no error, submit the form
    if (errorMsg.value.email == '' && errorMsg.value.password == '') {
        handleSubmit();
    }

}
</script>

<style scoped></style>