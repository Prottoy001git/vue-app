<template>
    <h3>User Form</h3>
    <div class="row gy-4">
        <div class="col-md-6">
            <h3>Form 1 (ref)</h3>
            <form @submit.prevent="formSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <!-- for complex data only const name wont work, have to include the part too... -->
                    <input type="text" class="form-control" v-model="name.fullname" id="name">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" v-model="email" id="email">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" id="password">
                </div>

                <div class="mb-3">
                    <label class="form-label">Gender</label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="gender" id="genderMale" value="Male">
                        <label class="form-check-label" for="genderMale">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="gender" id="genderFemale" value="Female">
                        <label class="form-check-label" for="genderFemale">Female</label>
                    </div>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" v-model="agree" id="agree" name="agree">
                    <label class="form-check-label" for="terms">I Agree</label>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="col-md-6">
            <h3>Form 2 (reactive)</h3>
            <form @submit.prevent="formSubmit2">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" v-model="post.title" id="title">
                    <div class="text-danger mt-1">{{ error.title }}</div>
                </div>
                <div class="mb-3">
                    <label for="details" class="form-label">Details</label>
                    <textarea class="form-control" v-model="post.details" id="details" rows="4"></textarea>
                    <div class="text-danger mt-1">{{ error.details }}</div>
                </div>
                <!-- <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="post.isActive" id="isActive">
                    <label class="form-check-label" for="isActive">
                        Active
                    </label>
                    <div class="text-danger mt-1">{{ error.isActive }}</div>
                </div> -->
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="post.agree" id="agree">
                    <label class="form-check-label" for="agree">
                        I agree to terms & conditions of the site
                    </label>
                    <div class="text-danger mt-1">{{ error.agree }}</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit Form 2</button>
            </form>

        </div>
    </div>

</template>

<script setup lang="ts">
import type { Post } from '@/interfaces/PostInterface';
import { ref, reactive } from 'vue';

// interface Post {
//     title: String;
//     details: String;
//     isActive: Boolean;
// }

//  For complex data use reactive
const post = reactive<Post>({
    title: '',
    details: '',
    // isActive: false,
    agree: false
});
const error = reactive({
    title: '',
    details: '',
    agree: ''
});

//  For simple data use ref
const name = ref({ id: 1, fullname: '' });
const email = ref('');
const password = ref('');
const gender = ref('');
const agree = ref(false);

function formSubmit() {
    // console.log("Form Submitted");
    // console.log("Name:", name.value);
    console.log("Name:", name.value.fullname);      // when printing complex value use--(const name).(value).(keyname)
    // console.log("Email:", email.value);
    // console.log("Password:", password.value);
    // console.log("Gender:", gender.value);
    // console.log("Agree:", agree.value);
}
function formSubmit2() {
    console.log("Title:", post.title);               // to print reactive data no need to use value, use the (const name).(data name) 
    console.log("Details:", post.details);
    console.log("isActive:", post.isActive);

    //======= Validation of Form inputs (Title)
    // const titleRegex = /^[a-zA-Z0-9.-]{1,}$/;
    const titleRegex = /^[a-zA-Z0-9 .-]+$/;
    if (post.title === '') {
        error.title = 'Title is required';
    } else if (post.title.length < 2) {
        error.title = 'Title must be atleast 2 characters';
    } else if (post.title.length > 20) {
        error.title = 'Title can not exceed 20 characters';
    } else if (!titleRegex.test(post.title)) {
        error.title = 'Title must be alphanumeric, space . or -';
    } else {
        error.title = '';
    }

    //======= Validation of Form inputs (Details)
    if (post.details === '') {
        error.details = 'Details is required';
    } else {
        error.details = '';
    }

    //======= Validation of Form inputs (Agree)
    if (post.agree == false) {
        error.agree = 'You must agree to terms and conditions';
    } else {
        error.agree = '';
    }

    //======= Form to be submitted or not
    if (error.title !== '' || error.details !== '' || error.agree !== '') {     // if any error message is found active or printed, form won't submit
        return;
    }

    alert('Submitted');
}

</script>

<style scoped></style>