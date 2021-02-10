<template>
  <Header/>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  methods:{
    init(){
      api.get('members').then(response => {
        console.log(response.data);
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
