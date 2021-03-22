<template>
  <Header/>
  <nav class="header-conversation navbar is-warning">
    <div class="navbar-item">
      <router-link class="button" :to="{ name: 'Membres' }">
        <span class="panel-icon" style="margin-left: 0.5rem;">
          <font-awesome-icon icon="long-arrow-alt-left" />
        </span>
        Retour
      </router-link>
    </div>
  </nav>
  <section class="main">
    <div class="panel" v-if="member != false">
      <p class="panel-heading">
        {{ member.fullname }}
      </p>
      <p class="panel-block">
        Adresse mail : {{ member.email }}<br>
        Pseudo : {{ member.fullname }}<br>
        A rejoint Co'op le : {{ member.created_at }}
      </p>
    </div>
    <div v-else-if="!dataLoaded">
      <h3>Chargement...</h3>
    </div>
    <div v-else>
      <h3>L'utilisateur est inexistant :(</h3>
    </div>
  </section>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default{
    data(){
      return {
        member: false,
        dataLoaded: false
      }
    },
    components: {
      Header
    },
    methods:{
      init(){
        if(this.$route.params.email){
          this.member = {
            email: this.$route.params.email,
            fullname: this.$route.params.fullname,
            created_at: this.$route.params.created_at
          };
          this.dataLoaded = true
        }
        else{
          api.get('members').then(response => {
            response.data.find(member => {
              if(member.fullname == this.$route.params.fullname)
                this.member = member;
            })
          }).catch(error => {
            console.log("Erreur : " + error.response.data.message);
          }).finally(() => {
            this.dataLoaded = true
          });
        }
      }
    },
    mounted(){
      this.init();
    }
  }
</script>
