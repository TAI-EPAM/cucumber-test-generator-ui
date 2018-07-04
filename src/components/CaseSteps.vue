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
                 @click ="toggleVisible(item.id)"
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
        <p>THEN:</p>
      </div>
      <div class="contentCaseSteps THEN">
        <div class="contentCaseStep" v-for="(item,index) in this.localCase.steps.filter(item => item.type === 'THEN')" >
         <p>{{index+1+localCase.steps.filter(item => item.type === 'GIVEN').length}}</p>
          <input type="text"
                 class="input-steps uui-form-element"
                 v-model="item.description"
                 v-on:input.once="setCheck(item.id)"
                 @click ="toggleVisible(item.id)"
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
    <hr class="line">
    <div class="caseStep">
      <div class="nameCaseSteps">
        <p>WHEN:</p>
      </div>
      <div class="contentCaseSteps WHEN">
        <div class="contentCaseStep" v-for="(item,index) in this.localCase.steps.filter(item => item.type === 'WHEN')">
          <p>{{index+1+localCase.steps.filter(i => i.type === 'THEN').length}}</p>
          <input type="text"
                 class="input-steps uui-form-element "
                 v-model="item.description"
                 v-on:input.once="setCheck(item.id)"
                 @click ="toggleVisible(item.id)"
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    components: {
    },
    data() {
      return {
        count:null,
        visible:null,
        entity: null,
        stepsNum: [],
      };
    },
    computed: {
      ...mapGetters(
        {
          updateSteps: 'getUpdateSteps'
        },
      ),
    },
    methods: {
      getValue(value){
        let update = this.localCase.steps.find(item => item.id === this.visible);
        update.description = value;
        this.$store.state.updateSteps.push(update);
        this.visible = null;
      },
      toggleVisible(numb){
        this.count++;
        this.stepsNum = this.localCase.steps.map(item => item.description).slice(0,10);
        console.log(this.stepsNum);
        this.visible = numb;
      },
      setCheck(id) {
        let step = this.localCase.steps.find(item => item.id === id);
        this.$store.state.updateSteps.push(step);
      },
      addStep(className){
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
    props: ['localCase', 'stepsNum'],
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

  .caseStep{
    margin-bottom:20px;
    background: white;
    border: 2px #ebeef0 solid;
    padding: 20px 10px 20px 30px;
    display: flex;
    flex-wrap: wrap;
  }
  .caseSteps{
    font-family: @Oswald_Regular;
    border-left: 1px solid #d8d8d8;
    margin-top: 0;
    padding-bottom: 40px;
    padding-top: 40px;
    padding-left: 40px;

  }
  .nameCaseSteps{
    color: #d8d8d8;
    font-size: 20px;
    padding-right: 10px;

  }
  .contentCaseSteps{
    width: 95%;
    max-height: 250px;
    overflow-y: auto;
  }
  .contentCaseStep{
    margin-left: 20px;
    p{
      float: left;
      margin: 10px 10px 10px 10px;
    }
  }
  .input-steps {
    width: 90%;
    margin-right: 10px;
    flex-grow: 2;
    color: black;
    outline: none;
    margin-bottom: 5px;
    border: 1px solid @gray_border;
    background-color: @gray_input_bg;
  }
  .input-steps:focus, .input-steps:hover {
    background-color: @white;
    border-color: @blue;
  }
  .step-delete{
    display: inline-block;
    height: 36px;
    padding: 8px 11px;
    vertical-align: middle;
    background-color: @white;
    border: 1px solid @white;
    border-radius: 50%;
  }
  .step-delete:hover{
    background-color:#e6425d;
    border: 1px solid #e6425d;
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
  }
  .step-add:hover{
    border: 1px solid #accb59;
    background-color:#accb59;
  }
  .line{
    border: 1px solid @gray_border;
    width: 40px;
    margin-left: -40px;
    position: absolute;
    margin-top: 30px;
  }
  .autocomplete{
    list-style-type: none;
    position: absolute;
    width: 50%;
    background: white;
    border:1px solid @blue;
  }
  .autocomplete-item{
    cursor: pointer;
    color: @gray_border;
    padding: 5px;

  }
  .autocomplete-item:hover{
    background: @blue;
  }

</style>
