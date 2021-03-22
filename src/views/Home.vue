<template>
  <Header/>
  <CreateConversation v-model:modalOpen="modalCreateConvOpen"/>
  <section class="main">
    <div class="panel">
      <p class="panel-heading">
        Conversations ({{ conversationsCount }} conversation(s))
        <button class="button is-small" @click="modalCreateConvOpen = true">
          <span class="icon"><font-awesome-icon icon="plus" /></span>
          <span>
			         Nouvelle conversation
		      </span>
        </button>
      </p>
      <p class="panel-block" v-for="conversation in conversations">
        <span class="panel-icon">
          <font-awesome-icon icon="comment" />
        </span>
        <router-link :to="{ name: 'Conversation', params: { id: conversation.id, topic: conversation.topic } }">
          <b>{{ conversation.topic }}</b>
        </router-link>
        <div class="tag">{{ conversation.label }}</div>
        <a class="panel-icon" v-on:click="deleteConversation(conversation.id, conversation.topic)" title="Supprimer la conversation">
          <font-awesome-icon icon="trash" />
        </a>
      </p>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import CreateConversation from '@/components/CreateConversation.vue'

export default {
  name: 'Home',
  data(){
    return {
      conversationsCount: 0,
      conversations: [],
      newConvLabel: '',
      newConvTopic: '',
      modalCreateConvOpen: false
    }
  },
  components: {
    Header,
    CreateConversation
  },
  mixins: [
    CreateConversation
  ],
  methods:{
    init(){
      api.get('channels').then(response => {
        this.conversationsCount = response.data.length
        this.conversations = response.data
      }).catch(error => {
        console.log("Erreur : " + error.response.data.message);
      });
    },
    deleteConversation(conversationID, conversationTopic){
      if(confirm(`Êtes vous sûr de vouloir supprimer la conversation "${conversationTopic}" ?`)){
        api.delete('channels/' + conversationID, {
          id: conversationID
        }).then(response => {
          this.emitter.emit("setNotification", {
            message: `La conversation "${conversationTopic}" a bien été supprimée.`,
            classStatus: 'is-success'
          })
          this.init();
        }).catch(error => {
          if(error.response){
            alert('Impossible de supprimer la conversation. ' + error.response.data.message);
          }else{
            alert("Impossible de supprimer la conversation une erreur inconnue s'est produite. Veuillez actualiser la page et si le problème persiste contacter l'administrateur de l'appliaction");
          }
        });
      }
    }
  },
  mounted(){
    console.log(this.$store.state.membre);
    this.init();
    console.log(this.conversations);

    this.emitter.on("modalCreateConvClosed", () => {
      this.modalCreateConvOpen = false;
    });
    this.emitter.on("createdConv", () => {
      this.init();
    });
  },
  beforeRouteLeave (to, from, next){
    this.emitter.emit("hideNotification");
    next()
  }
}
</script>

<style lang="scss">
  .panel-block > *{
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }

  .main > *{
    margin-top: 2rem;
    margin-left: 10%;
    margin-right: 10%;
  }
  .column-lcs{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items:flex-start;
    align-content:flex-start;

    .card{

      width: auto;
      min-width: 20%;
      margin-bottom: 1rem;
      .content{
        & > *{
          display: block;
          margin-bottom: 0.25rem;
        }
        button{
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>
