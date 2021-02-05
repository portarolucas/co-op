<template>
  <div class="pageloader" v-bind:class="{ 'is-active': !apiStatus }">
    <span class="title">
      Connexion à l'API
    </span>
  </div>
  <div id="content" v-if="apiStatus">
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
import bulmaPageLoader from 'bulma-pageloader'

export default {
  mounted() {
    console.log("L'application est lancée");
    api.get('ping').then(reponse => {
      let pageLoaderTimeout = setTimeout(() => {
        this.apiStatus = true
        clearTimeout(pageLoaderTimeout);
      }, 700);
      console.log("L'api est fonctionnelle");
      //this.$router.push('/login')
    }).catch(error => {
      console.log("L'api ne marche pas");
    })
  },
  data() {
    return {
      apiStatus: false
    }
  },
  beforeCreate(){
    this.$store.commit('initialiseStore');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
