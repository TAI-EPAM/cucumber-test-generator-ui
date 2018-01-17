<template>
  <div class="uui-form-wrapper login-form">
    <input type="text" name="login" value="" class="uui-form-element large" placeholder="E-mail" v-model="entity.email" />
    <input type="password" name="password" value="" class="uui-form-element large" placeholder="Password" v-model="entity.password" />
    <div class="form-buttons-holder">
      <v-button @click="reset" class="large">Reset</v-button>
      <v-button @click="login" class="lime-green large">Login</v-button>
    </div>
  </div>
</template>

<script>
  import AxiosClient from '../../utils/httpClient';
  import VButton from './EpamButton';

  export default {
    components: {
      VButton,
    },
    data() {
      return {
        entity: {
          email: null,
          password: null,
        },
      };
    },
    methods: {
      login() {
        AxiosClient.post('/cucumber/login', this.entity)
          .then((resp) => {
            if (resp.data.token) {
              this.$store.setToken(resp.data.token);
              this.$ls.set('token', resp.data.token);
              this.$ls.set('isAuth', 'true');
            }
            if (this.$route.query && this.$route.query.redirect) {
              this.$router.push(
                {
                  path: this.$route.query.redirect,
                });
            }
          })
          .catch((err) => {
            console.warn(err);
          });
      },
      reset() {
        this.entity = {
          email: null,
          password: null,
        };
      },
    },
    mounted() {
    },
    name: 'app-login',
  };
</script>

<style lang="less" scoped>
  .login-form {
    width: 600px;
    margin: 0 auto;
  }
</style>
