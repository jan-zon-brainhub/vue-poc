import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify.ts'
import pinia from '@/plugins/pinia.ts'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
