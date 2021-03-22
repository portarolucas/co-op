<script>

export default {
  beforeRouteLeave(){
    //fermer toutes les notifications de la route actuelle
    this.emitter.emit("hideNotification");

    if(this.$store.state.membre){
      api.get(`members/${this.$store.state.membre.id}/signedin`).then(reponse => {
        if(!reponse.data || reponse.statusText != 'OK' || reponse.status != 200){
          this.emitter.emit("setNotification", {
            message: "La session n'est plus active - Vous avez été déconnecté.",
            classStatus: 'is-danger'
          })
          this.emitter.emit("seDeconnecter");
        }
      }).catch((error) => {
        this.emitter.emit("setNotification", {
          message: "Erreur : " + error.response.data.message + " - Vous avez été déconnecté.",
          classStatus: 'is-danger'
        })
        this.emitter.emit("seDeconnecter");
      })
    }else if(!this.$store.state.membre && this.$route.path != '/login' && this.$route.path != '/createAccount'){
      this.$router.push('/login')
    }
  }
}

</script>
