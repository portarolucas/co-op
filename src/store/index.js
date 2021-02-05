import { createStore } from 'vuex'

export default createStore({
  state: {
    
  },
  getters: {

  },
  mutations: {
    setPiece(state,piece) {
      state.piece = piece;
    },
    initialiseStore(state) {
      if(localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
