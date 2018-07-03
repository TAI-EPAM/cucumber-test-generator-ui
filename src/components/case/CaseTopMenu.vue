<template>
  <section class="caseTopPanel">
    <div class="caseNamePanel">
      <div class="caseName">Case {{this.localCase.name}}</div>
      <button @click="getInfo"><svgicon v-bind:class="{ 'svg-active': this.getInfoStatus }" name="info" class="imgButton" id="imgButton"></svgicon></button>
    </div>
    <div class="caseInfo" v-bind:class="{ 'div-active': this.getInfoCaseStatus }">
      <div class="caseInfoText">
        <p>Project: {{this.$store.state.activeProject.name}}</p>
        <p>Test Suit: {{this.activeSuit.name}}</p>
        <p>Creation Date: {{this.activeSuit.creationDate | formatDate}}</p>
        <p>Last Update Date: {{this.activeSuit.updateDate | formatDate}}</p>
        <p>Test Suit Tags: {{this.activeSuit.tags}}</p>
        <p>Description: {{this.activeSuit.description}}</p>
      </div>
      <div class="caseInfoButton">
        <button @click="getInfo"><i class="fa fa-xl fa-remove icon"></i></button>
      </div>
    </div>
    <div class="nextCase">
      <a href="#" class="nextCaseButton" @click.prevent="saveAndOpenNext"></a>
    </div>
    <div class="history">
      <curtain
        buttonClass="historyButton"
        buttonText="H"
        headerText="History"
        headerMarkup="orange"
        :component="getCertainComponent()"
        v-if="localCase">
      </curtain>
    </div>
    <div class="editCase">
      <a href="#" class="editCaseButton" @click.prevent="editCase">
        <i class="fas fa-pencil-alt"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import equal from 'array-equal';
  import { mapGetters } from 'vuex';
  import CaseHistory from '@/components/case/CaseHistory';
  import Curtain from '@/components/ui/Curtain';
  import CaseEdit from '@/components/case/CaseEdit';
  import CaseAdd from '@/components/case/CaseAdd';
  import Case from '@/components/Case';
  import CaseSteps from '@/components/CaseSteps';
  import '../../assets/converted/info';

  export default {
    components: {
      CaseSteps,
      CaseHistory,
      Curtain,
      CaseEdit,
      CaseAdd,
      Case,
    },
    name: 'case-top-menu',
    data() {
      return {
        activeSuit: false,
        activeCase: false,
        nextCase: false,
        getInfoStatus: false,
        getInfoCaseStatus: false,
      };
    },
    methods: {
      getInfo() {
        this.activeSuit = this.$store.getters.getActiveSuitById(this.$route.params.suitId);
        this.getInfoStatus = !this.getInfoStatus;
        this.getInfoCaseStatus = !this.getInfoCaseStatus;
      },
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
      saveAndOpenNext() {
        this.saveTest();
        const suitId = this.$route.params.suitId;
        const projectId = this.$route.params.projectId;
        const caseId = +this.$route.params.caseId;
        this.activeSuit = this.$store.getters.getActiveSuitById(suitId);
        for(let index in this.activeSuit.cases){
          if((this.activeSuit.cases[index].id === caseId)&&(index < this.activeSuit.cases.length)){
            this.nextCase = this.activeSuit.cases[++index];
            this.$router.push({ path: `/projects/${projectId}/suits/${suitId}/case/${this.nextCase.id}` });
          }
        }
      },
      saveTest(){
        debugger;
        for(let item of this.$store.state.updateSteps) {
          let sandData = {
            description: item.description,
          };
          this.$store.dispatch('updateStepAsync', { data: sandData, stepId: item.id, projectId: this.$route.params.projectId, suitId:this.$route.params.suitId, caseId:this.$route.params.caseId})
            .then(() => {
            });
        }
        for(let item of this.localCase.steps){
          if (item.description === ' '){
            this.$store.dispatch('deleteStepAsync', { stepId: item.id, projectId: this.$route.params.projectId, suitId:this.$route.params.suitId, caseId:this.$route.params.caseId})
              .then(() => {
              });
          }
        }
      },
      isCreatedCommit(commit) {
        const attributes = ['id', 'name', 'description', 'creationDate', 'updateDate', 'priority', 'status'];
        const oldValues = [];
        const existAttributes = commit.propertyDifferences.map((el) => {
          oldValues.push(el.oldValue);
          return el.propertyName;
        });
        if (oldValues.find(el => el != null) || !equal(attributes, existAttributes)) {
          return false;
        }
        return true;
      },
      getCertainComponent() {
        return {
          component: {
            CaseHistory,
            CaseSteps
          },
          props: [
            { caseName: this.localCase.name },
            { commits: this.getCommits.filter(el => !this.isCreatedCommit(el)) },
          ],
        };
      },
    },
    computed: {
      ...mapGetters({
        getCommits: 'getCurrentCommits',
        getSuit: 'getActiveSuitById',
        updateSteps: 'getUpdateSteps',
      }),
    },
    props: ['localCase'],
  };
</script>

<style lang="less">
  .svg-active .cls-1{
    fill: #39c2d7;
  }
</style>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .caseTopPanel {
    height: 68px;
    margin: -30px -30px 0px -50px;
    background-color: @white;
    display: flex;
    box-shadow: 0px 1px 1px @gray_light;
    align-items: center;
    font-family: @Oswald_Regular;

    .caseNamePanel{
      flex-grow: 1;
    }
    .caseName {
      padding-left: 25px;
      font-size: 30px;
      color: @gray_dark;
      text-transform: capitalize;
      display: inline-block;
    }
    button{
      border: none;
      background: none;
    }
    .imgButton{
      width: 15px;
      height: 15px;
      margin-bottom: 20px;
    }
       .caseInfo{
         display: none;
         opacity: 0.8;
         background: #39c2d7;
         width: 20%;
         color: white;
         padding: 10px;
         z-index: 5;
         margin-top: 30px;
         margin-left: 200px;
         position: fixed;
       }
    .div-active {
      display: block;
    }
    .caseInfo:after {
      content: '';
      position: absolute;
      right: 360px;
      top: 15px;
      border: 10px solid transparent;
      border-right: 20px solid #39c2d7;
    }
       .caseInfoText{
         float:left;
       }
       .caseInfoButton{
         float:right;
           .icon {
             color: white;
             width: 20px;
             height: 20px;
           }
         }

    .nextCase, .history, .editCase {
      width: 66px;
      height: 100%;
      border-left: 1px solid @gray_light;
      text-align: center;
      position: relative;
    }

    .linkBeforeMixin(@content) {
      font-family: FontAwesome;
      display: inline-block;
      vertical-align: middle;
      color: @gray;
      font-size: 20px;
      position: absolute;
      top: 25px;
      left: 25px;
      content: @content;
    }

    .linkBeforeHoverMixin(@bg) {
      height: 100%;
      width: 100%;
      display: inline-block;
      background-color: @bg;
    }

    .editCaseButton:before {
      .linkBeforeMixin("\f044");
    }

    .nextCaseButton:before {
      .linkBeforeMixin("\f04e");
    }

    .nextCaseButton:hover {
      .linkBeforeHoverMixin(@green_lime);
    }

    .editCaseButton:hover {
      .linkBeforeHoverMixin(@fuchsia);
    }

    .editCaseButton:hover:before {
      color: @fuchsia;
    }

    .nextCaseButton:hover:before {
      color: @green_lime;
    }

  }
</style>

<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  button.uui-button.historyButton {
    background-color: transparent;
    border: none;
    font-size: 22px;
    margin-top: 13px;
    position: relative;
  }
  button.uui-button.historyButton:hover {
    background-color: @orange;
    color: @orange;
    width: 100%;
    height: 68px;
    margin: 0;
  }

  .linkAfterMixin(@content) {
    position: absolute;
    color: @white;
    font-size: 12px;
    font-family: @Source_Sans_Pro_Bold;
    line-height: 14px;
    left: 7px;
    right: 7px;
    top: 14px;
    text-transform: lowercase;
    content: @content;
  }

  button.uui-button.historyButton:hover:after {
    .linkAfterMixin('history of this case');
  }

  .nextCaseButton:hover:after {
    .linkAfterMixin('save case and open next');
  }

  .editCaseButton:hover:after {
    .linkAfterMixin('edit this case');
  }

</style>
