<template>
  <div id="content-side">
    <app-header />
    <main class="uui-main-container">
      <div class="app-wrapper">
        <global-errors></global-errors>
        <div class="content-view">
          <h2 class="registration-title">New Account Registration</h2>
          <div class="uui-form-wrapper registration-form">
            <div class="name-container">
              <input type="text" name="first-name" value="" class="uui-form-element large"
                     placeholder="First Name" v-model="entity.firstName"
                     @input="$v.entity.firstName.$touch()" :class="{'error': $v.entity.firstName.$error}" />
              <input type="text" name="last-name" value="" class="uui-form-element large"
                     placeholder="Last Name" v-model="entity.lastName"
                     @input="$v.entity.lastName.$touch()" :class="{'error': $v.entity.lastName.$error}"/>
            </div>
            <input type="text" name="email" value="" class="uui-form-element large"
                   placeholder="E-mail" v-model="entity.email"
                   @input="$v.entity.email.$touch()" :class="{'error': $v.entity.email.$error}"/>
            <input type="password" name="password" value="" class="uui-form-element large"
                   placeholder="Password" v-model="entity.password"
                   @input="$v.entity.password.$touch()" :class="{'error': $v.entity.password.$error}"/>
            <input type="password" name="password" value="" class="uui-form-element large"
                   placeholder="Password Confirmation" v-model="entity.confirmationPassword"
                   @input="$v.entity.password.$touch()" :class="{'error': $v.entity.password.$error}"/>
            <div class="form-buttons-holder">
              <v-button @click="() => register(this.entity)" class="uui-button blue large" :class="buttonClass">New user</v-button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '../components/ui/AppHeader';
  import AppFooter from '../components/ui/AppFooter';
  import GlobalErrors from '../components/ui/GlobalErrors';
  import VButton from '../components/ui/EpamButton';
  import { mapValidationsRegistration } from '../utils/validator';

  export default {
    components: {
      AppHeader,
      AppFooter,
      GlobalErrors,
      VButton,
    },
    data() {
      return {
        entity: {
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          confirmationPassword: null,
        },
      };
    },
    ...mapValidationsRegistration(),
    methods: {
      register() {
        this.$store.dispatch('registerAsync', { name: this.entity.firstName, surname: this.entity.lastName, email: this.entity.email, password: this.entity.password });
      },
    },
    computed: {
      buttonClass() {
        const passwordsEqual = this.entity.password === this.entity.confirmationPassword;
        return {
          disable: this.$v.entity.$invalid || !passwordsEqual,
        };
      },
    },
    name: 'RegistrationView',
  };
</script>

<style lang="less" scoped>
  @import "../assets/vendors/epam-ui/less/uui-colors.less";
  @import "../assets/vendors/epam-ui/less/uui-form-elements.less";
  @import "../assets/vendors/epam-ui/less/uui-buttons.less";
  @import "../assets/vendors/epam-ui/less/uui-fonts";

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
    height: 480px;
    background: @white;
    margin: 0 auto;
    padding: 50px 128px;

    input {
      margin-bottom: 40px;
    }

    .form-buttons-holder {
      text-align: center;

      v-button {
        width: 171px;
      }
    }

    .name-container{
      display: flex;
      justify-content: space-between;

      input[name$="-name"] {
        min-width: 0;
        width: 160px;
      }
    }
  }



</style>
