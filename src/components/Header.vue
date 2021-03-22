<template>
  <header>
    <nav class="navbar is-success is-fixed-top">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger" id="navbarBurger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'Home' }">Co'Op</router-link>
          <router-link class="navbar-item" :to="{ name: 'Home' }">Conversations</router-link>
          <router-link class="navbar-item" :to="{ name: 'Membres' }">Membres</router-link>
        </div>
        <div class="navbar-end">
          <font-awesome-icon style="color: black; height: 100%; cursor: pointer;" icon="user" @click="userSettings = true" />
          <div class="navbar-item">
            <button class="button is-primary" @click="disconnect">Se déconnecter</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="modal" v-bind:class="{ 'is-active' : userSettings }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Information de votre compte</p>
        <button class="delete" @click="userSettings = false" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>
          Adresse mail : {{ this.userEmail }}<br>
          Pseudo : {{ this.userFullname }}<br>
          Date de création : {{ this.userCreated }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="userSettings = false">Fermer</button>
      </footer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default{
  data(){
    return {
      userSettings: false
    }
  },
  computed:{
    userFullname(){
      return this.$store.state.membre.fullname
    },
    userEmail(){
      return this.$store.state.membre.email
    },
    userCreated(){
      return this.$store.state.membre.created_at
    }
  },
  methods: {
    disconnect(){
      $('.pageloader').removeClass('is-active').addClass('is-active');

      api.delete('members/signout').then(reponse => {
        this.emitter.emit("seDeconnecter");
      }).catch(error => {
        console.log('Une erreur est survenue')
      }).finally(() => {
        let pageLoaderTimeout = setTimeout(() => {
          $('.pageloader').removeClass('is-active');
          clearTimeout(pageLoaderTimeout);
        }, 700);
      })
    }
  }
}
</script>
