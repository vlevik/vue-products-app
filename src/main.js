import './assets/main.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/grid.scss'
import './assets/loader.scss'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import NewProductForm from './components/NewProductForm.vue'
import ProductDetails from './components/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: 'vue-products-app/', component: HomePage },
    { path: 'vue-products-app/new', component: NewProductForm },
    { path: 'vue-products-app/product/:id', component: ProductDetails }
  ]
})

const app = createApp(App)

app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')
