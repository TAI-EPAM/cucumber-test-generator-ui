<template>

  <section class="curtain-component">
    <epam-button v-if="!isOpen" @click="toggleView" class="" :class="buttonClass">{{ buttonText }}</epam-button>
    <div class="curtain-wrapper" v-if="isOpen">
      <div class="curtain-window">
        <div class="curtain-header" :class="headerMarkup">
          <p class="white">{{ headerText }}</p>
          <epam-button @click="toggleView" class="blue" :class="headerMarkup"><span class="fa fa-lg fa-times"></span></epam-button>
        </div>
        <div class="curtain-body">
          <component :is="component.component" v-bind="component.props"/>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import EpamButton from './EpamButton';

  export default {
    components: {
      EpamButton,
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleView() {
        this.isOpen = !this.isOpen;
      },
    },
    mounted() {

    },
    props: ['buttonClass', 'buttonText', 'headerText', 'headerMarkup', 'component'],
    name: 'curtainComponent',
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-core.less";
  @import "../../assets/vendors/epam-ui/less/uui-form-elements.less";
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  @keyframes move {
    0% {
      left: 100%;
    }
    100% {
      left: 360px;
    }
  }

.curtain-component {

  & .curtain-wrapper {

    background-color: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10500;

    & .curtain-window {

      position: fixed;
      top: 0;
      right: 0;
      z-index: 11000;
      background-color: @white;
      height: 100vh;
      animation: move 0.2s 1 linear;
      animation-fill-mode: forwards;

      & .curtain-header {
        background-color: @blue;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 10px 15px;
        font-family: @Oswald_Regular;

        p {
          font-size: 16px;
          text-transform: uppercase;
        }

        &.orange {
          background-color: @orange;
        }

      }

      & .curtain-body {
        height: 100%;
        padding: 20px auto;

      }

    }

  }

}
</style>
