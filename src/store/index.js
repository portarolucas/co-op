import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    membre: false,
    membreToken: false
  },
  getters: {

  },
  mutations: {
    setCreatedMail(state, createdMail){
      state.createdMail = createdMail
    },
    setMembre(state, membre){
      state.membre = membre
    },
    setToken(state, membreToken){
      state.membreToken = membreToken
    },
    seDeconnecter(state){
      state.membre = false
      state.membreToken = false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
