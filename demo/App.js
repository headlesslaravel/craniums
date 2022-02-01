import { createApp } from 'vue'
import App from './App.vue'
import Cranium from '../index.js'
import './app.css'

createApp(App)
    .mixin(Cranium)
    .mount('#app')
