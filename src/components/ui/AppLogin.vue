<template>
  <div class="wrapper" id="app">
    <div class="splashWrapper">
      <div class="splash"></div>
    </div>
    <div class="contentWrapper">
      <div>
        <span class="title">BDD Generator</span>
      </div>
      <h1>Authorization</h1>
      <div class="linkContainer">
        <router-link :to="{ name: 'Registration'}">Registration</router-link>
        <span></span>
        <a href="#">Forget password?</a>
      </div>
      <div class="uui-form-wrapper login-form">
        <input type="text" name="login" value="" class="uui-form-element large" placeholder="E-mail" v-model="entity.email" />
        <input type="password" name="password" value="" class="uui-form-element large" placeholder="Password" v-model="entity.password" />
        <div class="rememberMeContainer">
          <input type="checkbox" id="rememberMe" class="uui-checkbox"/><label for="rememberMe"> Remember me</label>
        </div>
        <div class="form-buttons-holder">
          <v-button @click="loginClick" class="lime-green large">Login</v-button>
        </div>
      </div>
      <footer class="loginFooter">
        <p>2017-2018 BDD Generator. All Right Reserved.</p>
        <p>Powered by</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import VButton from './EpamButton';
  import AppFooter from './AppFooter';

  export default {
    components: {
      AppFooter,
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
      loginClick() {
        this.login(this.entity);
      },
      register() {
        this.$router.push({ path: '/registration' });
      },
    },
    mounted() {
    },
    name: 'app-login',
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-fonts";
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-form-elements";

  .login-form {
    width: 400px;
    margin: 0 auto;

    input[type="text"] {
      margin: 46px 0;
    }

    input[type="password"] {
      margin-bottom: 10px;
    }
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
    text-align: center;
    padding-top: 135px;

    .title {
      font-size: 18px;
      font-family: @Oswald_Regular;
      text-transform: uppercase;
      color: @gray_dark;
    }

    & > h1 {
      margin: 100px auto 40px;
      color: @gray_light;
      text-transform: capitalize;
      font-family: @Oswald_Regular;
      font-size: 36px;
      font-weight: normal;
      margin-bottom: 10px;
    }

    .linkContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .linkContainer a {
      color: @blue;
      size: 14px;
      font-family: @Source_Sans_Pro_Light;
    }
    .linkContainer span {
      margin-left: 10px;
      margin-right: 10px;
      background-color: @gray_light;
      width: 1px;
      height: 24px;
      display: inline-block;
    }

    .rememberMeContainer {
      text-align: left;
      padding-left: 10px;

      label {
        color: @black;
        font-size: 12px;
        font-family: @Source_Sans_Pro_Light;
      }
    }

    .form-buttons-holder {
      text-align: center;
      margin-top: 56px;
    }

    .loginFooter{
      height: 65px;
      position: absolute;
      bottom: 0;
      border: 1px solid @gray_light;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      font-size: 12px;
    }

  }

</style>
