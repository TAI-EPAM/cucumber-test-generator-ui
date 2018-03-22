<template>
  <div class="wrapper" id="app">
    <div class="splashWrapper">
      <div class="splash"></div>
      <div class="titleContainer">
        <div class="mainTitle">Welcome to BDD Test Generator</div>
        <div class="division"></div>
        <div class="description">
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque
          Nemo enim ipsam voluptatem, quia voluptas sit,
          aspernatur aut odit aut fugit, sed quia consequuntur magni
        </div>
      </div>
    </div>
    <div class="contentWrapper">
      <global-errors></global-errors>
      <logo></logo>
      <p>Authorization</p>
      <div class="linkContainer">
        <router-link :to="{ name: 'Registration'}">Registration</router-link>
        <span></span>
        <router-link :to="{ name: 'PasswordForgot'}">Forgot password?</router-link>
      </div>
      <div class="uui-form-wrapper login-form">
        <input type="text" name="login" value="" class="uui-form-element large" placeholder="E-mail"
               v-model="entity.email"/>
        <input type="password" name="password" value="" class="uui-form-element large" placeholder="Password"
               v-model="entity.password"/>
        <div class="rememberMeContainer">
          <input type="checkbox" id="rememberMe" class="uui-checkbox"/><label for="rememberMe"> Remember me</label>
        </div>
        <div class="form-buttons-holder">
          <epam-button @click="loginClick" class="lime-green large">Login</epam-button>
        </div>
      </div>
      <footer class="loginFooter">
        <p>2017-2018 BDD Generator. All Right Reserved.</p>
        <p>Powered by</p>
      </footer>
    </div>
    <vuedal></vuedal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import AppFooter from './AppFooter';
  import Logo from './Logo';
  import EpamButton from './EpamButton';
  import GlobalErrors from './GlobalErrors';
  import Notification from '../Notification';
  import { Component as Vuedal } from './popoup-vuedals';

  export default {
    components: {
      AppFooter,
      Logo,
      EpamButton,
      Notification,
      Vuedal,
      GlobalErrors,
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
    background: @blue_dark;
    float: left;

    .titleContainer {
      position: absolute;
      color: @white;
      top: 35%;
      width: 53%;
      left: 11%;
      font-weight: lighter;
      font-family: @Oswald_Light;

      .mainTitle {
        font-size: 64px;
        font-weight: 300;
      }

      .division {
        width: 84px;
        height: 8px;
        background-color: @blue;
        margin: 52px auto 46px auto;
      }

      .description {
        width: 69%;
        margin: 0 auto;
        text-align: center;
        font-size: 24px;
        line-height: 24px;
      }

    }

    & > .splash {
      height: 100%;
      margin-right: 500px;
      margin-left: 0;
      background: url("../../assets/images/login_bg_shade.png") 0 0 no-repeat;
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

    & > p {
      margin: 90px auto;
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

    .loginFooter {
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
