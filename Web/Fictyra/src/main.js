import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'


import Home from './components/HomePage.vue'
import Register from './components/UserRegister.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register, meta: { hideTopBar: true, title: 'test' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
