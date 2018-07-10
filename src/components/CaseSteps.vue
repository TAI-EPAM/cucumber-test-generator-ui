<template>
  <div class="caseSteps" >
    <hr class="line">
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
                 v-on:input.once="setCheck(item.id)"
                 @click ="toggleVisible(item.id,{type:'GIVEN'})"
          />
          <ul v-show="(visible === item.id)&&(count% 2 !== 0)" class="autocomplete">
            <li v-for="item in stepsNum"
                @click="getValue(item)"
                class="autocomplete-item"
            >{{item}}</li>
          </ul>
          <button
            @click="addStep('GIVEN')"
            class="step-add">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </button>
          <button
            v-if=" localCase.steps.filter(item => item.type ==='GIVEN').length > 1 "
            @click="deleteStep(item.id)"
            class="step-delete">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <hr class="line">
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
                 v-on:input.once="setCheck(item.id)"
                 @click ="toggleVisible(item.id,{type:'WHEN'})"
          />
          <ul v-show="(visible === item.id)&&(count% 2 !== 0)" class="autocomplete">
            <li v-for="item in stepsNum"
                @click="getValue(item)"
                class="autocomplete-item"
            >{{item}}</li>
          </ul>
          <button @click="addStep('WHEN')" class="step-add">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </button>
          <button
            @click="deleteStep(item.id)"
            class="step-delete"
            v-if=" localCase.steps.filter(item => item.type ==='WHEN').length > 1 ">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <hr class="line">
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
                 @input="setCheck(item.id)"
                 @click ="toggleVisible(item.id, {type:'THEN'})"
          />
          <ul v-show="(visible === item.id)&&(count% 2 !== 0)" class="autocomplete">
            <li v-for="item in stepsNum"
                @click="getValue(item)"
                class="autocomplete-item"
            >{{item}}</li>
          </ul>
          <button
            @click="addStep('THEN')"
            class="step-add">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </button>
          <button
            @click="deleteStep(item.id)"
            class="step-delete"
            v-if=" localCase.steps.filter(item => item.type ==='THEN').length > 1 ">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        count:null,
        visible:null,
        entity: null,
        stepsNum: [],
        suggestions: [],
        type: null,
      };
    },
    computed: {
      ...mapGetters({
          updateSteps: 'getUpdateSteps',
          getSuggestionsByType: 'getSuggestionsByStepTypeAsync',
        },
      ),
    },
    methods: {
      getValue(value) {
        let update = this.localCase.steps.find(item => item.id === this.visible);
        update.description = value;
        if ((this.$store.state.updateSteps.length > 0)&&(this.$store.state.updateSteps.find(item=> item.id === update.id))) {
          let updatedStep = this.$store.state.updateSteps.find(item=> item.id === update.id);
          updatedStep.description = update.description;
        } else {
          this.$store.state.updateSteps.push(update);
        }
        this.visible = null;
      },
      toggleVisible(numb, stepType) {
        this.type = stepType.type;
        if (this.type) {
          this.$store.dispatch('getSuggestionsByStepTypeAsync', { type: this.type, projectId: this.$route.params.projectId })
            .then(() => {
              this.suggestions = this.getSuggestions;
            });
        }
        this.count++;
        this.stepsNum = this.$store.state.currentSuggestions.map(item => item.content).slice(0,10);
        this.visible = numb;
      },
      setCheck(id) {
        let step = this.localCase.steps.find(item => item.id === id);
        if ((this.$store.state.updateSteps.length > 0)&&(this.$store.state.updateSteps.find(item=> item.id === step.id))) {
          let updatedStep = this.$store.state.updateSteps.find(item=> item.id === step.id);
          updatedStep.description = step.description;
        } else {
          this.$store.state.updateSteps.push(step);
        }
      },
      addStep(className) {
        this.entity = {
          comment: " ",
          description: " ",
          status: "NOT_DONE",
          type: className
        }
        this.$store.dispatch('addStepAsync', { data: this.entity, projectId: this.$route.params.projectId, suitId:this.$route.params.suitId, caseId:this.$route.params.caseId})
          .then(() => {
          });
      },
      deleteStep(stepId){
        this.$store.dispatch('deleteStepAsync', { stepId: stepId, projectId: this.$route.params.projectId, suitId:this.$route.params.suitId, caseId:this.$route.params.caseId})
          .then(() => {
          });
      }
    },
    props: ['localCase'],
    name: 'CaseSteps',
  };

</script>

<style lang="less">
  .icon{
    color: #d8d8d8;
  }
  .step-delete:hover,.step-add:hover {
    .icon {
      color: white;
    }
  }
</style>
<style lang="less" scoped="true">
  @import "../assets/vendors/epam-ui/less/uui-colors";
  @import "../assets/vendors/epam-ui/less/uui-fonts";

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
            width: 88%;
            margin-right: 10px;
            flex-grow: 2;
            color: black;
            outline: none;
            margin-bottom: 5px;
            border: 1px solid @gray_border;
            background-color: @gray_input_bg;

            &:focus, &:hover {
              background-color: @white;
              border-color: @blue;
            }
          }
          .step-delete{
            display: inline-block;
            height: 36px;
            padding: 8px 11px;
            vertical-align: middle;
            background-color: @white;
            border: 1px solid @white;
            border-radius: 50%;

            &:hover{
              background-color:#e6425d;
              border: 1px solid #e6425d;
            }
          }
          .step-add{
            display: inline-block;
            height: 36px;
            padding: 8px 11px;
            vertical-align: middle;
            transform: rotate(45deg);
            justify-content: flex-end;
            background-color: @white;
            border: 1px solid @white;
            border-radius: 50%;

            &:hover{
              border: 1px solid #accb59;
              background-color:#accb59;
            }
          }
          .autocomplete{
            list-style-type: none;
            position: absolute;
            margin-left: 50px;
            width: 50%;
            background: white;
            border:1px solid @blue;

            .autocomplete-item{
              cursor: pointer;
              color: @gray_border;
              padding: 5px;

              &:hover{
                background: @blue;
              }
            }
          }
        }
      }
    }
  }

  .line{
    border: 1px solid @gray_border;
    width: 40px;
    margin-left: -40px;
    position: absolute;
    margin-top: 30px;
  }

</style>
