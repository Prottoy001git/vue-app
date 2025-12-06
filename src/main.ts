import './assets/main.css'
import './assets/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import router from './routes/index.ts'
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue'
import App from './App.vue'





createApp(App)
.use(router)
.mount('#app')
