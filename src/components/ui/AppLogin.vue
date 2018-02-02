<template>
  <div class="wrapper" id="app">

    <div class="splashWrapper">
      <div class="splash"></div>
    </div>
    <div class="contentWrapper">
      <h1>Authorization</h1>
      <div class="uui-form-wrapper login-form">
        <input type="text" name="login" value="" class="uui-form-element large" placeholder="E-mail" v-model="entity.email" />
        <input type="password" name="password" value="" class="uui-form-element large" placeholder="Password" v-model="entity.password" />
        <div class="form-buttons-holder">
          <v-button @click="reset" class="large">Reset</v-button>
          <v-button @click="login" class="lime-green large">Login</v-button>
        </div>
      </div>
    </div>

  </div>



</template>

<script>
  import { mapActions } from 'vuex';
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
      ...mapActions({
        login: 'loginAsync',
      }),
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
    width: 400px;
    margin: 0 auto;
  }

  .splashWrapper {
    width: 100%;
    height: 100%;
    background: #1a9cb0;
    float: left;

    & > .splash {
      height: 100%;
      margin-right: 500px;
      margin-left: 0;
      background: url("../../assets/images/login.png") 0 0 no-repeat;
      background-size: cover;
    }

  }

  .contentWrapper {
    position: relative;
    width: 500px;
    height: 100%;
    margin-left: -500px;
    float: left;
    background: white;

    & > h1 {
      margin: 100px auto 40px;
      text-align: center;
    }
  }

</style>
