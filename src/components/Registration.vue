<template>
  <div class="registration-content-view">
    <h2 class="registration-title">New Account Registration</h2>
    <div class="uui-form-wrapper registration-form">
      <div class="name-container">
        <input type="text" name="first-name" value="" class="uui-form-element large"
               placeholder="First Name" v-model="entity.name"
               @input="$v.entity.name.$touch()"
               :class="{ 'error': $v.entity.name.$error }"/>
        <input type="text" name="last-name" value="" class="uui-form-element large"
               placeholder="Last Name" v-model="entity.surname"
               @input="$v.entity.surname.$touch()"
               :class="{ 'error': $v.entity.surname.$error }"/>
      </div>
      <input type="text" name="email" value="" class="uui-form-element large"
             placeholder="E-mail" v-model="entity.email"
             @input="$v.entity.email.$touch()"
             :class="{ 'error': $v.entity.email.$error }"/>
      <input type="password" name="password" value="" class="uui-form-element large"
             placeholder="Password" v-model="entity.password"
             @input="$v.entity.password.$touch()"
             :class="{ 'error': $v.entity.password.$error }"/>
      <input type="password" name="password" value="" class="uui-form-element large"
             placeholder="Password Confirmation" v-model="entity.confirmationPassword"
             @input="$v.entity.confirmationPassword.$touch()"
             :class="confirmationPassword"/>
      <div class="form-buttons-holder">
        <epam-button @click="registerClick" class="uui-button blue large" :class="buttonClass">New user
        </epam-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import EpamButton from './ui/EpamButton';
  import { Component as Vuedal } from './ui/popoup-vuedals/index';
  import Notification from './Notification';
  import { mapValidationsRegistration } from '../utils/validator';

  export default {
    components: {
      EpamButton,
      Notification,
      Vuedal,
      mapActions,
    },
    data() {
      return {
        entity: {
          name: null,
          surname: null,
          email: null,
          password: null,
          confirmationPassword: null,
        },
      };
    },
    ...mapValidationsRegistration(),
    methods: {
      ...mapActions({
        register: 'registerAsync',
      }),
      registerClick() {
        this.register(this.entity).then(() => {
          this.$vuedals.open({
            title: 'New user registration',
            component: Notification,
            props: {
              message: `Visit ${this.entity.email} to complete registration`,
              onCancel() {
                this.$vuedals.close();
                this.$router.push({ path: '/login' });
              },
            },
          });
        });
      },
    },
    computed: {
      buttonClass() {
        const passwordsEqual = this.entity.password === this.entity.confirmationPassword;
        return {
          disable: this.$v.entity.$invalid || !passwordsEqual,
        };
      },
      confirmationPassword() {
        return {
          error: this.entity.password !== this.entity.confirmationPassword,
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

    .name-container {
      display: flex;
      justify-content: space-between;

      input[name$="-name"] {
        min-width: 0;
        width: 160px;
      }
    }
  }


</style>
