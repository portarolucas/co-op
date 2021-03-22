//VueJS
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import bulma from 'bulma'
import mitt from 'mitt';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faEnvelope, faUser, faTrash, faComment, faPlus, faSync, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'normalize.css/normalize.css';

const emitter = mitt();

window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: '98ba80d27cbd691ecf726ac9c7c4c9e122cf4aec'}
});

const app = createApp(App);
app.config.globalProperties.emitter = emitter//ajout de l'émetteur
app.use(store).use(router).mount('#app')

//* Particles (animation page de login/inscription) *//
import Particles from 'particles.js'
require('@/assets/main.scss')
//* --------- *//

//* Font Awesome (ajout des icons nécessaires) *//
library.add({faLock, faEnvelope, faUser, faTrash, faComment, faPlus, faSync, faLongArrowAltLeft})
app.component('font-awesome-icon', FontAwesomeIcon)
//* ----------- *//
