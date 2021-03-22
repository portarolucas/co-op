<template>
  <Header/>
  <section class="main">
    <div class="panel">
      <p class="panel-heading">
        Membres ({{ membersCount }} membre(s))
      </p>
      <p class="panel-block" v-for="member in members">
        <span class="panel-icon">
          <font-awesome-icon icon="user" />
        </span>
        <span class="panel-icon">
          <img :src="'https://robohash.org/' + member.email + '.png'">
        </span>
        <router-link :to="{ name: 'Membre', params: { fullname: member.fullname, email: member.email, created_at: member.created_at  } }">
          <b>{{ member.fullname }}</b>
        </router-link>
        <span class="tag">{{ member.email }}</span>
        <a class="panel-icon" v-if="member.id != this.$store.state.membre.id" v-on:click="deleteMember(member.id, $event)">
          <font-awesome-icon icon="trash" />
        </a>
      </p>
    </div>
  </section>
</template>


<script>
import Header from '@/components/Header.vue'
import $ from 'jquery'

export default{
  name: 'Membres',
  data(){
    return {
      membersCount: 0,
      members: []
    }
  },
  components: {
    Header
  },
  methods: {
    init(){
      api.get('members').then(response => {
        this.membersCount = response.data.length
        this.members = response.data
      }).catch(error => {
        console.log("Erreur : " + error.response.data.message);
      });
    },
    deleteMember(id, elem){
      if(confirm("Vous êtes sur le point de supprimer un membre, êtes vous sûr de votre choix ?")){
        if(id != this.$store.state.membre.id){
          api.delete('members/' + id).then(response => {
            $(elem.target).closest('p.panel-block').remove();
            this.membersCount--;
            this.emitter.emit("setNotification", {
              message: "Le membre a bien été supprimé.",
              classStatus: 'is-success'
            })
          }).catch(error => {
            console.log("Erreur : " + error.response.data.message);
            this.emitter.emit("setNotification", {
              message: "Erreur : " + error.response.data.message,
              classStatus: 'is-danger'
            })
          })
        }else{
          this.emitter.emit("setNotification", {
            message: "Vous ne pouvez pas supprimer votre compte en étant connecté dessus.",
            classStatus: 'is-danger'
          })
        }
      }
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="scss">
  .main > *{
    margin-top: 2rem;
    margin-left: 10%;
    margin-right: 10%;
  }

  .panel-block > *{
    margin-right: 0.75em;
  }

</style>
