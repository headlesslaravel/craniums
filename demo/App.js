import { createApp } from 'vue'
import App from './App.vue'
import Cranium from '../index.js'

createApp(App)
    .mixin(Cranium)
    .mount('#app')
