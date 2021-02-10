<template>
  <div class="pageloader" v-bind:class="{ 'is-active' : !appLoaded }">
      <span class="title">
        Connexion à l'API
      </span>
  </div>
  <div v-if="appLoaded">
    <div v-if="apiStatus">
      <div class="notification is-light" style="z-index: 999;display: none;" :class="[ notifClassStatus ]">
        <button class="delete" @click="hideNotification"></button>
        <p>{{ notifMessage }}</p>
      </div>
      <router-view/>
    </div>
    <div v-else>
      <div class="container">
        <div class="row">
          <div class="column column-50 column-offset-25">
            <h1>Erreur</h1>
            <h1>Connexion impossible à l'API</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import bulmaPageLoader from 'bulma-pageloader'

export default {
  methods: {
    showNotification(message, classStatus){
      this.notifMessage = message
      this.notifClassStatus = classStatus
      $('.notification').fadeIn('500');
    },
    hideNotification(){
      $('.notification').fadeOut('500');
    }
  },
  beforeCreate(){
    api.interceptors.request.use(config => {
        if(this.$store.state.membreToken) {
            config.url+='?token='+this.$store.state.membreToken
        }
        return config;
    })
  },
  mounted() {
    //TEST API
    api.get('ping').then(reponse => {
      this.apiStatus = true
      if(!this.$store.state.membre){
        if(this.$route.path != '/login' && this.$route.path != '/createAccount'){
          this.$router.push('/login')
        }
      }
    }).catch(error => {
      console.log("L'api ne marche pas");
    }).finally(() => {
      setTimeout(() => {
        this.appLoaded = true;
      }, 700);
    })

    //NOTIFICATION ERREUR
    this.emitter.on("setNotification", info => {
      $('.notification').hide(200);
      setTimeout(() => {
        this.showNotification(info.message, info.classStatus)
      }, 500);
    });
    this.emitter.on("hideNotification", () => {
      this.hideNotification()
    });
  },
  data() {
    return {
      appLoaded: false,
      apiStatus: false,
      notifMessage: '',
      notifClassStatus: ''
    }
  }
}
</script>

<style scoped>
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

.notification{
  position: fixed;
  top: 0;left:0;
  width: 100%;
}
</style>
