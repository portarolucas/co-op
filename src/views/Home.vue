<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    init(){
      api.get('members').then(response => {
        console.log(reponse);
      }).catch(error => {
        console.log("Erreur : " + error.response.data.message);
      });
    }
  },
  mounted(){
    this.init()
  }
}
</script>
