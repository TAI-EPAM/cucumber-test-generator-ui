<!--suppress ALL -->

<template>
  <div class="footer-menu-button">
    <epam-button class="footer-menu-big-button" @click="GeneratorButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="generate" class="imgButton"></svgicon><p>GENERATOR</p></epam-button>
    <epam-button class="footer-menu-big-button" @click="TestRunButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="testRun" class="imgButton"></svgicon><p>TEST RUN</p></epam-button>
    <epam-button class="footer-menu-small-button" @click="DeletePopupButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="delete" class="imgButton"></svgicon></epam-button>
  </div>
</template>

<script>
  /* eslint-disable */

  import { mapActions, mapGetters } from 'vuex';
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
    comments: {},
    name: 'footer-menu-button',
    data: {
    },
    computed: {
      ...mapGetters(
        {
          selectedObject: 'getSelectObject',
          getActiveProject: ' getActiveProject',
        },
      ),
    },
    methods: {
      ...mapActions({
        GeneratorButtonAsync: 'GeneratorButtonAsync',
      }),
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
      GeneratorButton() {
        const suitActiveIds = this.$store.state.selectedObject.suits;
        const caseActiveIds = this.$store.state.selectedObject.cases;
        const suits = JSON.stringify(this.$store.state.activeProject.suits);
        let list = [];
        const suitsFiltred = JSON.parse(suits).filter(item => suitActiveIds.has(item.id));
        const caseFiltered = suitsFiltred.filter(item => item.cases = item.cases.filter(item => caseActiveIds.has(item.id)));
        caseFiltered.forEach(item => {
         let newsuitAndCaseId = {
            'caseIds': item.cases.map(index => index.id),
            'suitId': item.id
          }
          list.push(newsuitAndCaseId);
        });
        const suitAndCaseIds = { list };
        this.$store.dispatch('GeneratorButtonAsync', { projectId: this.$route.params.projectId, suitAndCaseIds })
          .then(() => {
            this.$store.state.selectedObject = null;
          });
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
