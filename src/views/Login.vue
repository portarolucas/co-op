<template>
  <section style="
  position: absolute;
  margin-top: 50vh;
  transform: translateY(-50%);
  left: calc(50% - 125px);
  background-color: transparent;
  top: 0px;
  z-index: 99;"
  >
    <div class="hero-body" style="padding: 0;">
      <p class="title">
        Co'op
      </p>
      <div class="container">
        <div class="columns is-centered">
          <div class="column">
            <form @submit.prevent="seConnecter" action="" class="box" style="width: 350px;">
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input v-model="login" type="email" class="input" required>
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Mot de passe</label>
                <div class="control has-icons-left">
                  <input v-model="password" type="password" class="input" required>
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="se_souvenir" class="checkbox">
                  <input id="se_souvenir" type="checkbox">
                  Se souvenir de moi
                </label>
              </div>
              <div class="field">
                <button class="button is-success">
                  Se connecter
                </button>
              </div>
              <hr>
              <div class="field">
                <router-link :to="{ name: 'CreateAccount' }">Créer votre compte</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div id="particles-js" class="interactive-bg column is-8" style="z-index: 0;" />
</template>

<script>

import { jsonUri } from '@/assets/particles.js';

export default{
  data() {
    return {
      login : '',
      password : ''
    }
  },
  methods:{
    init(){
      particlesJS.load('particles-js', jsonUri, function() {
        console.log('callback - particles.js config loaded');
      });
    },
    seConnecter(){
      api.post('members/signin', {
        'email' : this.login,
        'password' : this.password
      }).then(response => {
        this.$store.commit('setMembre', response.data.member)
        this.$store.commit('setToken', response.data.token)
        this.emitter.emit("setNotification", {
          message: 'Vous êtes connecté',
          classStatus: 'is-success'
        })
        this.$router.push('/')
      }).catch(error => {
        if(error.response){
          this.emitter.emit("setNotification", {
            message: 'Impossible de se connecter. ' + error.response.data.message,
            classStatus: 'is-danger'
          })
        }else{
          console.log(error)
          this.emitter.emit("setNotification", {
            message: "Impossible de se connecter une erreur inconnue s'est produite. Veuillez actualiser la page et si le problème persiste contacter l'administrateur de l'application",
            classStatus: 'is-danger'
          })
        }
      })
    }
  },
  beforeRouteLeave(){
    this.emitter.emit("hideNotification")
  },
  mounted(){
    this.init()
    if(this.$store.state.mail){
      this.login = this.$store.state.mail
    }
  }
}
</script>

<style scoped>
.interactive-bg {
  z-index: -999;
  position: absolute;
  top:0px;left:0px;
  height: 100vh;
  width: 100%;
  background-color: #C0C0C0;
}
</style>
