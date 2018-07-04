<template>
  <section class="case-view" v-if="$route.params.caseId">
      <case-top-menu :local-case="localCase" v-if="localCase"></case-top-menu>
      <!--<case :local-case="localCase"/>-->
      <!-- Steps-->
      <case-steps :local-case="localCase"></case-steps>
    <div class="bottomCase">
      <hr class="line">
      <epam-button markup="large" class="lime-green" @click="saveTest">Save Tests</epam-button>
      <input type="checkbox" id="checkbox" class="checkbox" v-model="checked">
      <label for="checkbox">Create new case after saving</label>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CaseSteps from '@/components/CaseSteps';
  import Case from '@/components/Case';
  import Confirmation from '@/components/Confimation';
  import EpamButton from '@/components/ui/EpamButton';
  import CaseEdit from '@/components/case/CaseEdit';
  import CaseTopMenu from '../components/case/CaseTopMenu';

  export default {
    components: {
      Case,
      EpamButton,
      CaseEdit,
      CaseTopMenu,
      CaseSteps,
    },
    data() {
      return {
        checked: false,
        localCase: null,
      };
    },
    methods: {
      editCase() {
        this.$vuedals.open({
          title: 'Edit Case',
          component: CaseEdit,
          props: {
            value: this.localCase,
            projectId: this.$route.params.projectId,
            suitId: this.$route.params.suitId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
      getData(projectId = this.$route.params.projectId,
        suitId = this.$route.params.suitId,
        caseId = this.$route.params.caseId) {
        this.$store.dispatch('getCaseHistoryAsync', { projectId, suitId, caseId })
          .then(() => {
            this.$router.push({ path: `/projects/${projectId}/suits/${suitId}/case/${caseId}` });
            this.localCase = this.getCase(suitId, caseId);
          });
      },
      saveTest(){
        let saveUpdateSteps = this.$store.state.updateSteps.filter(item =>  this.localCase.steps.includes(item));
        for(let item of saveUpdateSteps) {
          let sandData = {
            description: item.description,
          };
          this.$store.dispatch('updateStepAsync', { data: sandData, stepId: item.id, projectId: this.$route.params.projectId, suitId:this.$route.params.suitId, caseId:this.$route.params.caseId})
            .then(() => {
              this.$store.state.updateSteps=[];
            });
        }
        for(let item of this.localCase.steps){
          if (item.description === ' '){
            this.$store.dispatch('deleteStepAsync', { stepId: item.id, projectId: this.$route.params.projectId, suitId:this.$route.params.suitId, caseId:this.$route.params.caseId})
              .then(() => {
              });
          }
        }
        if(this.checked === true){
          this.entity = {
            comment: "string",
            description: "string",
            name: "string",
            priority: 1,
            tags: [
              {
                name: "string"
              }
            ]
          }
          this.$store.dispatch('addCaseAsync', { projectId: this.$route.params.projectId, suitId: this.$route.params.suitId, data: this.entity })
            .then(() => {
              let saveCaseId = this.$store.state.saveCaseForMove;
              console.log(saveCaseId);
              this.$store.dispatch('getCaseHistoryAsync', { projectId: this.$route.params.projectId, suitId: this.$route.params.suitId, caseId: saveCaseId })
                .then(() => {
                  this.$router.push({ path: `/projects/${this.$route.params.projectId}/suits/${this.$route.params.suitId}/case/${saveCaseId}` });
                  this.localCase = this.getCase(this.$route.params.suitId, saveCaseId);
                });
            });
        }
      },
    },
    mounted() {
      if (this.$route.params.projectId &&
           this.$route.params.suitId &&
           this.$route.params.caseId) {
        this.getData();
      }
    },
    computed: {
      ...mapGetters({
        updateSteps: 'getUpdateSteps',
        isAuth: 'isAuth',
        getToken: 'getToken',
        getCase: 'getActiveCaseById',
        getSaveCaseForMove: 'getSaveCaseForMove',
      }),
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      '$route'(n) {
        if (n.params.projectId && n.params.suitId && n.params.caseId) {
          this.getData(n.params.projectId, n.params.suitId, n.params.caseId);
        }
      },
    },
    name: 'CaseView',
  };
</script>

<style lang="less" scoped>
  .case-view {
    margin-left: 20px;
  }
</style>

<style lang="less">
  @import "../assets/vendors/epam-ui/less/uui-colors";
  @import "../assets/vendors/epam-ui/less/uui-fonts";

  .case-history-button {
    position: fixed;
    top: 200px;
    right: -45px;
    transform: rotate(-90deg);
  }
  .bottomCase{
    margin-top: -25px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-family: @Oswald_Regular;
    font-size: 13px;
    .checkbox{
      width: 16px;
      height: 16px;
      margin-left: 20px;
      margin-right: 5px;

    }
  }
  .line{
    border: 1px solid @gray_border;
    height: 0;
    width: 40px;
  }

</style>
