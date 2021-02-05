<template>
  <section style="
  position: absolute;
  margin-top: 50vh;
  transform: translateY(-50%);
  left: calc(50% - 125px);
  background-color: transparent;
  top: 0px;
  z-index: 99;"
  >
    <div class="hero-body" style="padding: 0;">
      <p class="title">
        Inscription
      </p>
      <div class="container">
        <div class="columns is-centered">
          <div class="column">
            <form @submit.prevent="createAccount" class="box" style="width: 350px;">
              <div class="field">
                <label for="" class="label">Votre nom :</label>
                <div class="control has-icons-left">
                  <input type="text" v-model="fullname" required class="input">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="user" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" v-model="email" required class="input">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Mot de passe</label>
                <div class="control has-icons-left">
                  <input type="password" v-model="password" required class="input">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-success">Créer mon compte</button>
              </div>
              <hr>
              <div class="field">
                <router-link :to="{ name: 'Login' }">Déjà membre ? connectez-vous</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div id="particles-js" class="interactive-bg column is-8" style="z-index: 0;" />
</template>

<script>
let partJson = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};
var jsonUri = "data:text/plain;base64,"+window.btoa(JSON.stringify(partJson));

  export default {
    data(){
      return {
        fullname: '',
        email: '',
        password: ''
      }
    },
    methods: {
      init(){
        particlesJS.load('particles-js', jsonUri, function() {
          console.log('callback - particles.js config loaded');
        });
      },
      createAccount() {
        api.post('members', {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        }).then(response => {
          alert('Votre compte a été créé');
          this.$router.push({ name: 'Login' });
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

<style scoped>
.interactive-bg {
  z-index: -999;
  position: absolute;
  top:0px;left:0px;
  height: 100vh;
  width: 100%;
  background-color: #C0C0C0;
}
</style>
