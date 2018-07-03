<!--suppress ALL -->

<template>
  <div class="footer-menu-button">
    <epam-button class="footer-menu-big-button" @click="GeneratorButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="generate" class="imgButton"></svgicon><p>GENERATOR</p></epam-button>
    <epam-button class="footer-menu-big-button" @click="TestRunButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="testRun" class="imgButton"></svgicon><p>TEST RUN</p></epam-button>
    <epam-button class="footer-menu-small-button" @click="DeletePopupButton($store.state.selectedObject)" v-bind:disabled="$store.state.selectedObject==null"><svgicon name="delete" class="imgButton"></svgicon></epam-button>
  </div>
</template>

<script>

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
    data:{
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
        deleteSuitsAsync: 'deleteSuitsAsync',
        deleteCaseAsync: 'deleteCaseAsync',
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
                let removeSuitsIds =[],
                    saveRemoveSuits =[],
                    allSelectSuitAndCase = [],
                    deleteCasesinSuits =[],
                    selectSuitAndCase = [];
                const suits =  _.cloneDeep(this.$store.state.activeProject.suits);
                const suitActiveIds = this.$store.state.selectedObject.suits;
                const caseActiveIds = this.$store.state.selectedObject.cases;
                const suitsFiltred = suits.filter(item => suitActiveIds.has(item.id));
                const caseFiltered =  _.cloneDeep(suitsFiltred).filter(item => item.cases = item.cases.filter(item => caseActiveIds.has(item.id)));
                suits.forEach( item => {
                  let saveAr = {
                    caseIds: item.cases.map(index => index.id),
                    suitId: item.id
                  }
                  allSelectSuitAndCase.push(saveAr);
                });
                if (this.$store.state.selectedObject.checkAll){
                  suitsFiltred.forEach(item => { saveRemoveSuits.push(item.id)});
                }
                else {
                  caseFiltered.forEach(item => {
                    let saveArr = {
                      caseIds: item.cases.map(index => index.id),
                      suitId: item.id
                    }
                    selectSuitAndCase.push(saveArr);
                  });
                }
                //search for suits to be removed completely
                allSelectSuitAndCase.forEach(firstItem => {
                  selectSuitAndCase.forEach(secondItem =>{
                    if( JSON.stringify(firstItem) === JSON.stringify(secondItem)){
                      saveRemoveSuits.push(secondItem.suitId);
                      deleteCasesinSuits.push(secondItem.caseIds);
                    }
                  })
                })
                removeSuitsIds = saveRemoveSuits.filter( (item, pos) => {
                  return saveRemoveSuits.indexOf(item) == pos;
                })
                let CaseWithout = selectSuitAndCase.filter(item => !deleteCasesinSuits.includes(item.caseIds));
                if(removeSuitsIds.length !== null){
                  this.$store.dispatch('deleteSuitsAsync', { projectId: this.$route.params.projectId, removeSuitsIds })
                    .then(() => {
                      this.$router.push({ path: `/projects/${this.$route.params.projectId}` });
                      this.$vuedals.close();
                    })
                }
                CaseWithout.forEach(item => {
                  let saveRemoveCases = {
                    caseIds: item.caseIds,
                    suitId: item.suitId
                  };
                  this.$store.dispatch('deleteCaseAsync',{ projectId: this.$route.params.projectId, suitId: saveRemoveCases.suitId, removeCaseIds: saveRemoveCases.caseIds  })
                    .then(() => {
                      this.$router.push({ path: `/projects/${this.$route.params.projectId}` });
                      this.$vuedals.close();
                    });
                })
                this.$vuedals.close();
              },
            },
          });
        }},
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
