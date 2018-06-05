<template>
  <div class="footer-menu-button">
    <epam-button class="footer-menu-big-button" @click="GeneratorButton" ><svgicon name="generate" class="imgButton"></svgicon><p>GENERATOR</p></epam-button>
    <epam-button class="footer-menu-big-button" @click="TestRunButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="testRun" class="imgButton"></svgicon><p>TEST RUN</p></epam-button>
    <epam-button class="footer-menu-small-button" @click="DeletePopupButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="delete" class="imgButton"></svgicon></epam-button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import Confirmation from '../Confimation';
  import '../../assets/converted/delete';
  import '../../assets/converted/generate';
  import '../../assets/converted/testRun';

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
        if (this.$store.state.selectedObject) {
          this.$vuedals.open({
            title: 'Delete',
            component: Confirmation,
            props: {
              onCancel() {
                this.$vuedals.close();
              },
              onSubmit() {
                console.log(JSON.stringify(this.$store.state.selectedObject));// add multidelete.
                this.$vuedals.close();
              },
            },
          });
        }
      },
      TestRunButton() {
        this.$router.push({ path: '/testRun' });
      },
    },
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-form-elements";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

    .footer-menu-button{
      display: flex;
      width: 100%;
      position: absolute;
      bottom: 8%;
      justify-content:space-around;
      .footer-menu-small-button{
        width: 20%;
        background: #cb2323;

        &:hover {
          background: #b22746;
        }

        .imgButton{
          width: 15px;
          vertical-align: middle;
        }

        &:disabled {
          cursor: not-allowed;
          background: #e5e5e5;
          border-color: #e5e5e5;
          color: @gray_light;
          i {
            color: @gray_light;
          }
        }
      }
      & button {
        display: flex;
        justify-content:space-around;
        width: 35%;
        background: #3bb4f2;
        border: none;
        color: white;

        .imgButton{
          width: 15px;
        }
        &:hover {
          background: #1a9cb0;
          color: @gray_light;
        }
        &:disabled {
          cursor: not-allowed;
          background: #e5e5e5;
          border-color: #e5e5e5;
          color: white;
          i {
            color: white;
          }
        }
      }
    }
</style>
