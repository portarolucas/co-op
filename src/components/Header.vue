<template>
  <header>
    <nav class="navbar is-success">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger" id="navbarBurger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <span class="navbar-item">Co'Op</span>
          <router-link class="navbar-item" :to="{ name: 'Conversation' }">Conversation</router-link>
          <router-link class="navbar-item" :to="{ name: 'Membres' }">Membres</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <button class="button is-primary" @click="seDeconnecter">Se déconnecter</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import $ from 'jquery'

export default{
  methods: {
    seDeconnecter(){
      $('.pageloader').removeClass('is-active').addClass('is-active');

      api.delete('members/signout').then(reponse => {
        this.$store.commit('seDeconnecter');
        this.$router.push('/login');
        console.log('Vous êtes déconnecté')
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
