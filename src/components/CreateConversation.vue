<template>
  <div class="modal" v-bind:class="{ 'is-active' : modalOpen }" >
    <div class="modal-background"></div>
    <div class="modal-card">
      <form class="form-horizontal" @submit.prevent="createConv">
        <header class="modal-card-head">
          <p class="modal-card-title">Créer une conversation</p>
          <button type="button" class="delete" aria-label="close" @click='this.emitter.emit("modalCreateConvClosed")'></button>
        </header>
        <section class="modal-card-body">
          <fieldset>
            <div class="field">
              <label class="label" for="textinput-0">Sujet de la conversation :</label>
              <div class="control">
                <input id="textinput-0" name="textinput-0" type="text" class="input " v-model="topic">
              </div>
            </div>

            <div class="field">
              <label class="label" for="textinput-1">Étiquette de la conversation :</label>
              <div class="control">
                <input id="textinput-1" name="textinput-1" type="text" class="input " v-model="label">
              </div>
            </div>

          </fieldset>
        </section>
        <footer class="modal-card-foot">
          <button type="submit" class="button is-success">Créer la conversation</button>
          <button type="button" class="button" @click="cancel();">Annuler</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default{
  props: ['modalOpen'],
  data(){
    return{
      topic: '',
      label: ''
    }
  },
  methods:{
    cancel(){
      this.topic = '';
      this.label = '';
      this.emitter.emit("modalCreateConvClosed");
    },
    createConv(){
      api.post('channels', {
        label: this.label,
        topic: this.topic
      }).then(response => {
        this.emitter.emit("setNotification", {
          message: 'La conversation a bien été créée',
          classStatus: 'is-success'
        })
        this.cancel();
        this.emitter.emit("createdConv");
      }).catch(error => {
        if(error.response){
          this.emitter.emit("setNotification", {
            message: 'Impossible de créer la conversation. ' + error.response.data.message,
            classStatus: 'is-danger'
          })
        }else{
          this.emitter.emit("setNotification", {
            message: "Impossible de créer la conversation une erreur inconnue s'est produite. Veuillez actualiser la page et si le problème persiste contacter l'administrateur de l'appliaction",
            classStatus: 'is-danger'
          })
        }
      });
    }
  }
}
</script>

<style lang="scss">

</style>
