<template>
  <Header/>
  <section class="main-section">
    <nav class="header-conversation navbar is-warning is-fixed-top">
      <div class="navbar-item">
        <router-link class="button" :to="{ name: 'Home' }">
          <span class="panel-icon" style="margin-left: 0.5rem;">
            <font-awesome-icon icon="long-arrow-alt-left" />
          </span>
          Retour
        </router-link>
      </div>
      <div class="title-conversation navbar-item">
        <h1>{{ this.$route.params.topic }}</h1>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button refresh" @click="init()">
            Rafraîchir
            <span class="panel-icon" style="margin-left: 0.5rem;">
              <font-awesome-icon icon="sync" />
            </span>
          </button>
        </div>
      </div>
    </nav>
    <div class="messages">
      <article class="message is-small" v-for="message in messages" v-bind:class="{ 'self-message' : message.member_fullname == this.$store.state.membre.fullname }">
        <div class="message-header">
          <p>Envoyé par
            <b>
              <span v-if="message.member_fullname">
                {{ message.member_fullname }}
              </span>
              <span v-else style="color: #CC0000;">
                [deletedUser]
              </span>
            </b>
          </p>

          <a class="panel-icon" v-on:click="deleteMessage(message.id)" title="Supprimer le message">
            <font-awesome-icon icon="trash" />
          </a>
        </div>
        <div class="message-body">
          {{ message.message }}
        </div>
      </article>
    </div>
    <nav class="footer-conversation navbar is-fixed-bottom">
      <form @submit.prevent="createMessage()" class="send-message columns" style="width: 100%;">
        <input class="input is-normal column is-four-fifths" v-model="newMessage" type="text" placeholder="Envoyer un message"/>
        <button class="column">Envoyer</button>
      </form>
    </nav>
  </section>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import $ from 'jquery'

export default {
  name: 'Conversation',
  data(){
    return {
      messages: [],
      newMessage: '',
      members: [],
      autoRefresh: null
    }
  },
  components: {
    Header
  },
  updated(){
    window.scrollTo(0,document.body.scrollHeight);
  },
  methods:{
    init(){
      $('.button.refresh').addClass('active');
      api.get('members').then(response => {
        this.members = response.data;
      }).catch(error => {
        console.log("Erreur : " + error.response.data.message);
      });
      api.get('channels/' + this.$route.params.id + '/posts').then(response => {
        response.data.forEach((message, index) => {
          this.members.find(member => {
            if(member.id == message.member_id)
              response.data[index]['member_fullname'] = member.fullname;
          })
        });
        this.messages = response.data.reverse();//reverse pour avoir les derniers messages posté en bas
      }).catch(error => {
        console.log("Erreur : " + error.response.data.message);
      }).finally(() => {
        setTimeout(() => {
          $('.button.refresh').removeClass('active');
        }, 2000);
      })
    },
    createMessage(){
      api.post('channels/' + this.$route.params.id + '/posts', {
        channel_id: this.$route.params.id,
        member_id: this.$store.state.membre.id,
        message: this.newMessage
      }).then(response => {
        this.init();
        this.newMessage = '';
      }).catch(error => {
        if(error.response){
          alert('Impossible de créer la conversation. ' + error.response.data.message);
        }else{
          alert("Impossible de créer la conversation une erreur inconnue s'est produite. Veuillez actualiser la page et si le problème persiste contacter l'administrateur de l'appliaction");
        }
      });
    },
    deleteMessage(messageID){
      api.delete('channels/' + this.$route.params.id + '/posts/' + messageID, {
        channel_id: this.$route.params.id,
        id: messageID
      }).then(response => {
        this.init();
      }).catch(error => {
        if(error.response){
          alert('Impossible de supprimer le message. ' + error.response.data.message);
        }else{
          alert("Impossible de supprimer le message une erreur inconnue s'est produite. Veuillez actualiser la page et si le problème persiste contacter l'administrateur de l'appliaction");
        }
      });
    },
    refreshMessage(){
      api.get('members').then(response => {
        this.members = response.data;
      }).catch(error => {
        alert("Erreur : " + error.response.data.message);
        clearInterval(this.autoRefresh);
      });
      api.get('channels/' + this.$route.params.id + '/posts').then(response => {
        response.data.forEach((message, index) => {
          this.members.find(member => {
            if(member.id == message.member_id)
              response.data[index]['member_fullname'] = member.fullname;
          })
        });
        this.messages = response.data.reverse();//reverse pour avoir les derniers messages posté en bas
      }).catch(error => {
        alert("Erreur : " + error.response.data.message);
        clearInterval(this.autoRefresh);
      });
    }
  },
  mounted(){
    this.init();
    this.autoRefresh = setInterval(() => {
      this.refreshMessage();
    }, 3000)
  },
  beforeRouteLeave (to, from, next){
    this.emitter.emit("hideNotification");
    next()
  }
}
</script>

<style lang="scss">
@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.refresh{
  & .panel-icon{
    transition: transform 2s;
  }
  &.active .panel-icon{
    -webkit-animation: rotating 2s ease-in-out infinite;
    -moz-animation: rotating 2s ease-in-out infinite;
    -ms-animation: rotating 2s ease-in-out infinite;
    -o-animation: rotating 2s ease-in-out infinite;
    animation: rotating 2s ease-in-out infinite;
  }
}
.main-section {
  margin-left:2rem;
  margin-right: 2rem;
  margin-top: 3.25rem + 3.25rem / 2;
  .navbar.is-fixed-top{
    margin-top: 3.25rem;
  }
}
.messages{
  margin-bottom: 4.75rem;
  display: flex;
  flex-wrap: wrap;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;

  .message{
    width: 70%;
    align-self: flex-start;

    &.self-message{
      align-self: flex-end !important;
    }
  }
}
.send-message{
  margin-left: 0;
  margin-right: 0;
  margin-top: 0 !important;
  margin-bottom: 0 !important;

  .input{
    border-radius: 0;
    border: 0;
    padding: 0;
    padding-left: 1rem;
    height: 100%;
    line-height: 100%;
    &:focus {
      outline:none;
      box-shadow: none;
    }
  }
  button{
    border: 0;
    cursor: pointer;
    padding: 0;
    &:focus {
      outline:none;
      box-shadow: none;
    }
  }

  & > *{

  }
}

.footer-conversation{
  box-shadow: 1px 1px 10px 6px rgb(0 0 0 / 66%);
  -webkit-box-shadow: 1px 1px 10px 6px rgb(0 0 0 / 10%);
  -moz-box-shadow: 1px 1px 10px 6px rgba(0,0,0,0.66);
}
</style>
