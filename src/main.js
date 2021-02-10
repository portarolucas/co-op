//VueJS
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import bulma from 'bulma'
import mitt from 'mitt';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emitter = mitt();

window.api = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: { Authorization: 'f067210db3ff1ef24b1de430b1f85cddccd4f8ce'}
});

//store.subscribe((mutation, state) => {
//    localStorage.setItem('store', JSON.stringify(state));
//});

const app = createApp(App);
app.config.globalProperties.emitter = emitter//ajout de l'émetteur
app.use(store).use(router).mount('#app')

//* Particles *//
import Particles from 'particles.js'
require('@/assets/main.scss')
//* --------- *//

//* Font Awesome *//
library.add({faLock, faEnvelope, faUser})
app.component('font-awesome-icon', FontAwesomeIcon)
//* ----------- *//
