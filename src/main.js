//VueJS
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import bulma from 'bulma'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

window.api = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  params: {
    token : false
  },
  headers: { Authorization: 'f067210db3ff1ef24b1de430b1f85cddccd4f8ce'}
});

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});

const app = createApp(App);
app.use(store).use(router).mount('#app')

//* Particles *//
import Particles from 'particles.js'
require('@/assets/main.scss')
//* --------- *//

//* Font Awesome *//
library.add({faLock, faEnvelope, faUser})
app.component('font-awesome-icon', FontAwesomeIcon)
//* ----------- *//
