<template>
  <div>
    <div class="test-case-top">
      <div class="caseNamePanel">
        <div class="caseName">Case {{this.localCase.name}}<sup><svgicon name="info" class="imgButton" id="imgButton"/> TEST RUN</sup></div>
      </div>
      <div class="nextCase">
        <a href="#" class="nextCaseButton" @click.prevent="saveAndOpenNext"></a>
      </div>
      <div class="history">
        <!--<curtain-->
          <!--buttonClass="historyButton"-->
          <!--buttonText="H"-->
          <!--headerText="History"-->
          <!--headerMarkup="orange"-->
          <!--:component="getCertainComponent()"-->
          <!--v-if="this.localCase">-->
        <!--</curtain>-->
      </div>
    </div>
    <div class="test-case-view">
      <div class="caseSteps" >
        <hr class="line-run">
        <div class="caseStep" >
          <div class="nameCaseSteps">
            <p>GIVEN:</p>
          </div>
          <div class="contentCaseSteps GIVEN">
            <div class="contentCaseStep" v-for="(item,index) in this.localCase.steps.filter(item => item.type === 'GIVEN')">
              <p>{{index+1}}</p>
              <input type="text"
                     class="input-steps uui-form-element "
                     v-model="item.description"
              />
              <select v-model="item.displayedStatusName" @change="setCheck(item)" class="select-status">
                <option v-for="sitem in status">
                  {{sitem[1].title}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <hr class="line-run">
        <div class="caseStep">
          <div class="nameCaseSteps">
            <p>WHEN:</p>
          </div>
          <div class="contentCaseSteps WHEN">
            <div class="contentCaseStep" v-for="(item,index) in this.localCase.steps.filter(item => item.type === 'WHEN')">
              <p>{{index+1+localCase.steps.filter(item => item.type === 'GIVEN').length}}</p>
              <input type="text"
                     class="input-steps uui-form-element "
                     v-model="item.description"
              />
              <select v-model="item.displayedStatusName" @change="setCheck(item)" class="select-status">
                <option v-for="sitem in status">
                  {{sitem[1].title}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <hr class="line-run">
        <div class="caseStep">
          <div class="nameCaseSteps">
            <p>THEN:</p>
          </div>
          <div class="contentCaseSteps THEN">
            <div class="contentCaseStep" v-for="(item,index) in this.localCase.steps.filter(item => item.type === 'THEN')" >
              <p>{{index+1+localCase.steps.filter(item => item.type === 'WHEN').length+localCase.steps.filter(item => item.type === 'GIVEN').length}}</p>
              <input type="text"
                     class="input-steps uui-form-element"
                     v-model="item.description"
              />
              <select v-model="item.displayedStatusName" @change="setCheck(item)" class="select-status">
                <option v-for="sitem in status">
                  {{sitem[1].title}}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="test-case-bottom">
      <hr class="line">
      <epam-button @click="testPassed" class="lime-green">
        TEST PASSED
      </epam-button>
      <epam-button @click="testNotPassed" class="raspberry">
        TEST NOT PASSED
      </epam-button>
    </div>
  </div>
</template>

<script>
  import equal from 'array-equal';
  import StepStatusMap from '../../constants/Status';
  import { mapGetters } from 'vuex';
  import CaseHistory from '../case/CaseHistory';
  import Curtain from '../ui/Curtain';
  import EpamButton from '../ui/EpamButton';
  import '../../assets/converted/info';

  export default {
    name: 'TestRunCase',
    components: {
      StepStatusMap,
      CaseHistory,
      Curtain,
      EpamButton,
    },
    data() {
      return {
        status: [...StepStatusMap],
        activeSuit: null,
        localCases: null,
        nextCase: null,
        saveStatus: [],
        updateStatus: null,
      };
    },
    ...mapGetters({
      getCommits: 'getCurrentCommits',
      getSuit: 'getActiveSuitById',
    }),
    methods:{
      setCheck(value) {
        this.saveStatus.push(value);
      },
      saveAndOpenNext() {
        //вставить save
        const suitId = this.$route.params.suitId;
        const projectId = this.$route.params.projectId;
        const caseId = +this.$route.params.caseId;
        this.activeSuit = this.$store.state.activeProject.suits.find(item => item.id === +suitId);
        this.localCases = this.activeSuit.cases.filter(item => this.$store.state.selectedObject.cases.has(item.id));
        for( let index in this.localCases){
          if((this.localCases[index].id === caseId)&&( index < this.localCases.length-1)){
            this.nextCase = this.localCases[++index];
            this.$router.push({ path: `/testRun/projects/${projectId}/suits/${suitId}/case/${this.nextCase.id}` });
          }
        }
      },
      testNotPassed() {
        this.saveStatus = [];
        const caseId = +this.$route.params.caseId;
        const suitId = this.$route.params.suitId;
        let localSuit = this.$store.state.activeProject.suits.find(item => item.id === +suitId);
        this.localCase = JSON.parse(JSON.stringify(localSuit)).cases.find(item => item.id === +caseId);
        console.log(this.$store.state.activeProject.suits);
      },
      testPassed() {
        this.$store.state.updateStatus = this.saveStatus.filter((item, pos) => {
          return this.saveStatus.indexOf(item) === pos;
        });
        console.log(this.$store.state.updateStatus);
      },
    },
    props: ['localCase'],
  }
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .test-case-top {
    height: 68px;
    margin: -30px -30px 0px -30px;
    background-color: @white;
    display: flex;
    box-shadow: 0 1px 1px @gray_light;
    align-items: center;
    font-family: @Oswald_Regular;

    .caseNamePanel {
      flex-grow: 1;
    }
    .caseName {
      padding-left: 25px;
      font-size: 30px;
      color: #39c2d7;
      text-transform: capitalize;
      display: inline-block;
      sup{
        font-size: 13px;
        color: #39c2d7;
      }

    }
    .nextCase, .history {
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

    .nextCaseButton:before {
      .linkBeforeMixin("\f04e");
    }

    .nextCaseButton:hover {
      .linkBeforeHoverMixin(@green_lime);
    }

    .nextCaseButton:hover:before {
      color: @green_lime;
    }

  }
</style>

<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";
  .imgButton{
    width: 13px;
    fill: #39c2d7;
  }
  .caseSteps{
    font-family: @Oswald_Regular;
    border-left: 1px solid #d8d8d8;
    margin-top: 0;
    padding: 40px 0 40px 40px;

    .caseStep{
      margin-bottom:20px;
      background: white;
      border: 2px #ebeef0 solid;
      padding: 20px 10px 20px 30px;
      display: flex;
      flex-wrap: wrap;

      .nameCaseSteps{
        color: #d8d8d8;
        font-size: 20px;
        padding-right: 10px;
      }
      .contentCaseSteps{
        width: 95%;
        max-height: 250px;
        overflow-y: auto;

        .contentCaseStep{
          margin-left: 20px;

          p{
            float: left;
            margin: 10px 20px 10px 10px;
            width: 20px;
            text-align: center;
          }
          .input-steps {
            width: 85%;
            margin-right: 10px;
            flex-grow: 2;
            color: black;
            outline: none;
            margin-bottom: 5px;
            border: 1px solid @gray_border;
            background-color: @gray_input_bg;

          }
          .select-status{
            float: right;
            font-family: @Oswald_Regular;
            padding: 8px;
            border:none;
            :first-child{
              background-color:@raspberry;
              color: white;
            }
            :nth-child(2){
              color: #666666;
              background-color: #9e9e9e;
            }
            :nth-child(3){
              color: white;
              background-color: @orange;
            }
            :nth-child(4){
              color: white;
              background-color: @green_lime;
            }
          }
        }
      }
    }
  }

  .line-run{
    border: 1px solid @gray_border;
    width: 40px;
    margin-left: -40px;
    position: absolute;
    margin-top: 30px;
  }

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
  .test-case-bottom{
    margin-top: -20px;
    margin-left: 40px;
    font-family: @Oswald_Regular;
    font-size: 13px;
    .line{
      position: absolute;
      border: 1px solid @gray_border;
      height: 0;
      width: 40px;
      margin-left: -40px;
      margin-top: 20px;
    }
  }
</style>
