import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { es } from 'vuetify/locale'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
    messages: { es }
  },
  theme: {
    defaultTheme: 'light'
  }
})

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
