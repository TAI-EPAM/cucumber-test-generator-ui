<template>
  <div class="footer-menu-button">
    <button class="footer-menu-big-button" @click="GeneratorButton" >GENERATOR</button>
    <button class="footer-menu-big-button" @click="TestRunButton" >TEST RUN</button>
    <button class="footer-menu-small-button"  @click="DeletePopupButton($store.selectedObject)" >del</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import Confirmation from '../Confimation';

  export default {
    components: {
      EpamButton,
      Confirmation,
    },
    comments: { },
    name: 'footer-menu-button',
    data: {
    },
    computed: {
      ...mapGetters(
        {
          selectedObject: 'getSelectObject',
        },
      ),
    },
    methods: {
      DeletePopupButton() {
        this.$vuedals.open({
          title: 'Delete',
          component: Confirmation,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
    },
  };
</script>

<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-form-elements";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

    .footer-menu-button{
      display: flex;
      width: 100%;
      position: absolute;
      bottom: 10%;
      justify-content:space-around;
      & button {
        height: 40px;
        width: 35%;
        background: #3bb4f2;
        border: none;
        color: white;
        &:hover {
        background: #1a9cb0;
        }}
      & .footer-menu-small-button{
        width: 20%;
        background: #cb2323;
        &:hover {
          background: #b22746;
        }
      }
      }
</style>
