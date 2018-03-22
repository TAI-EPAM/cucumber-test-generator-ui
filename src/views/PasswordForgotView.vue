<template>
  <div id="content-side">
    <app-header/>
    <main class="uui-main-container">
      <div class="app-wrapper">
        <global-errors></global-errors>
        <div class="content-view">
          <h2 class="registration-title">Access recovering</h2>
          <div class="uui-form-wrapper registration-form">
            <input type="text" name="email" value="" class="uui-form-element large"
                   placeholder="E-mail" v-model="email"/>
            <div class="form-buttons-holder">
              <epam-button @click="passwordForgotClick" class="uui-button lime-green large">Send email</epam-button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
    <vuedal></vuedal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import AppHeader from '../components/ui/AppHeader';
  import AppFooter from '../components/ui/AppFooter';
  import GlobalErrors from '../components/ui/GlobalErrors';
  import Notification from '../components/Notification';
  import EpamButton from '../components/ui/EpamButton';
  import { Component as Vuedal } from '../components/ui/popoup-vuedals';

  export default {
    components: {
      AppHeader,
      AppFooter,
      GlobalErrors,
      Notification,
      EpamButton,
      mapActions,
      Vuedal,
    },
    data() {
      return {
        email: null,
      };
    },
    methods: {
      ...mapActions({
        passwordForgot: 'passwordForgotAsync',
      }),
      passwordForgotClick() {
        this.passwordForgot({ email: this.email }).then(() => {
          this.$vuedals.open({
            title: 'Recover access',
            component: Notification,
            props: {
              message: `Visit ${this.email} to reset password`,
              onCancel() {
                this.$vuedals.close();
                this.$router.push({ path: '/login' });
              },
            },
          });
        });
      },
    },
    computed: {},
    name: 'ForgotPassword',
  };
</script>

<style lang="less" scoped>
  @import "../assets/vendors/epam-ui/less/uui-colors.less";
  @import "../assets/vendors/epam-ui/less/uui-fonts";

  #content-side {
    height: 100%;
  }

  .registration-title {
    text-align: center;
    color: @gray;
    font-family: @Oswald_Light;
    font-weight: 300;
    font-size: 36px;
    text-transform: capitalize;
    margin-bottom: 0;
    margin-top: 26px;
    padding-bottom: 56px;
  }

  .registration-form {
    width: 600px;
    height: 240px;
    background: @white;
    margin: 0 auto;
    padding: 50px 128px;

    input {
      margin-bottom: 40px;
    }

    .form-buttons-holder {
      text-align: center;
    }
  }

  footer {
    position: absolute;
    bottom: 0;
  }

</style>
