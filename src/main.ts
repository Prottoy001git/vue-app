import './assets/main.css'
import './assets/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css';
import router from './routes/index.ts'
import { createPinia } from 'pinia';

import { createApp } from 'vue'
import App from './App.vue'


const pinia = createPinia();


createApp(App)
.use(pinia)
.use(router)
.mount('#app')
