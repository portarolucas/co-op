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
        Inscription
      </p>
      <div class="container">
        <div class="columns is-centered">
          <div class="column">
            <form @submit.prevent="createAccount" class="box" style="width: 350px;">
              <div class="field">
                <label for="" class="label">Votre nom :</label>
                <div class="control has-icons-left">
                  <input type="text" v-model="fullname" placeholder="Nom" required class="input">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="user" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Votre adresse mail</label>
                <div class="control has-icons-left">
                  <input type="email" v-model="email" placeholder="Adresse mail" required class="input">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Votre mot de passe</label>
                <div class="control has-icons-left">
                  <input type="password" v-model="password" placeholder="Mot de passe" required class="input">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-success">Créer mon compte</button>
              </div>
              <hr>
              <div class="field">
                <router-link :to="{ name: 'Login' }">Déjà membre ? connectez-vous</router-link>
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

  export default {
    data(){
      return {
        fullname: '',
        email: '',
        password: ''
      }
    },
    methods: {
      init(){
        particlesJS.load('particles-js', jsonUri, function() {
          console.log('callback - particles.js config loaded');
        });
      },
      createAccount() {
        api.post('members', {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        }).then(response => {
          this.emitter.emit("setNotification", {
            message: 'Votre compte a bien été créé',
            classStatus: 'is-success'
          })
          this.$store.commit('setCreatedMail', this.email)
          this.$router.push({ name: 'Login' });
        }).catch(error => {
          if(error.response){
            this.emitter.emit("setNotification", {
              message: 'Impossible de créer le compte. ' + error.response.data.message,
              classStatus: 'is-danger'
            })
          }else{
            this.emitter.emit("setNotification", {
              message: "Impossible de créer le compte une erreur inconnue s'est produite. Veuillez actualiser la page et si le problème persiste contacter l'administrateur de l'appliaction",
              classStatus: 'is-danger'
            })
          }
        });
      }
    },
    mounted(){
      this.init()
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
