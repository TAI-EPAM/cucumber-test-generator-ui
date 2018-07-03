<!--<template>-->
<!--<div v-if="steps">-->
  <!--<div class="uui-timeline" style="margin-top: 40px">-->
    <!--<ul class="timeline-wrapper">-->
      <!--<li class="timeline-body">-->
        <!--<div class="line">-->
          <!--<div class="item-wrapper">-->
            <!--<div class="timeline-section icon">-->
              <!--<span class="uui-icon timeline-icon">G</span>-->
            <!--</div>-->
            <!--<div class="timeline-section" v-if="steps.given">-->
              <!--<draggable :list="steps.given" element="ul" @update="updateSteps($event, steps.given)">-->
                  <!--<li v-for="step in steps.given" :key="step.rowNumber">-->
                    <!--<span>{{ step.description }} / {{ step.rowNumber }}</span>-->
                    <!--<epam-button markup="small">delete</epam-button>-->
                  <!--</li>-->
              <!--</draggable>-->
              <!--<div class="add-step-section">-->
                <!--<input type="text" class="uui-form-element" /><epam-button @click="addStep(0)">add new step</epam-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
      <!--<li class="timeline-body">-->
        <!--<div class="line">-->
          <!--<div class="item-wrapper">-->
            <!--<div class="timeline-section icon">-->
              <!--<span class="uui-icon timeline-icon">W</span>-->
            <!--</div>-->
            <!--<div class="timeline-section">-->
              <!--<draggable :list="steps.when" element="ul" @update="updateSteps($event, steps.when)">-->
                <!--<li v-for="step in steps.when" :key="step.rowNumber">-->
                  <!--<span>{{ step.description }} / {{ step.rowNumber }}</span>-->
                  <!--<epam-button markup="small">delete</epam-button>-->
                <!--</li>-->
              <!--</draggable>-->
              <!--<div class="add-step-section">-->
                <!--<input type="text" class="uui-form-element" /><epam-button @click="addStep(1)">add new step</epam-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
      <!--<li class="timeline-body">-->
        <!--<div class="line">-->
          <!--<div class="item-wrapper">-->
            <!--<div class="timeline-section icon">-->
              <!--<span class="uui-icon timeline-icon">T</span>-->
            <!--</div>-->
            <!--<div class="timeline-section">-->
              <!--<draggable :list="steps.then" element="ul" @update="updateSteps($event, steps.then)">-->
                <!--<li v-for="step in steps.then" :key="step.rowNumber">-->
                  <!--<span>{{ step.description }} / {{ step.rowNumber }}</span>-->
                  <!--<epam-button markup="small">delete</epam-button>-->
                <!--</li>-->
              <!--</draggable>-->
              <!--<div class="add-step-section">-->
                <!--<input type="text" class="uui-form-element" /><epam-button @click="addStep(2)">add new step</epam-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
    <!--</ul>-->
  <!--</div>-->

<!--</div>-->
<!--</template>-->
<template>
  <div class="caseSteps" >
    <div class="caseStep" >
      <div class="nameCaseSteps">
        <p>GIVEN:</p>
      </div>
      <div class="contentCaseSteps GIVEN">
        <div class="contentCaseStep" v-for="item in localCase.steps" v-if="item.type === 'GIVEN'" >
          <input type="text"
                 class="input-steps uui-form-element "
                 v-model="item.description"
                 v-on:input.once="setCheck(item.id)"
          />
          <epam-button
            @click="addStep('GIVEN')"
            class="step-add">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </epam-button>
          <epam-button
            v-if=" localCase.steps.filter(item => item.type ==='GIVEN').length > 1 "
            @click="deleteStep(item.id)"
            class="step-delete">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </epam-button>

        </div>
      </div>
    </div>
    <div class="caseStep">
      <div class="nameCaseSteps">
        <p>THEN:</p>
      </div>
      <div class="contentCaseSteps THEN">
        <div class="contentCaseStep" v-for="item in localCase.steps" v-if="item.type === 'THEN'">
          <input type="text"
                 class="input-steps uui-form-element"
                 v-model="item.description"
                 v-on:input.once="setCheck(item.id)"
          />
          <epam-button
            @click="addStep('THEN')"
            class="step-add">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </epam-button>
          <epam-button
            @click="deleteStep(item.id)"
            class="step-delete"
            v-if=" localCase.steps.filter(item => item.type ==='THEN').length > 1 ">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </epam-button>
        </div>
      </div>
    </div>
    <div class="caseStep">
      <div class="nameCaseSteps">
        <p>WHEN:</p>
      </div>
      <div class="contentCaseSteps WHEN">
        <div class="contentCaseStep" v-for="item in localCase.steps" v-if="item.type === 'WHEN'">
          <input type="text"
                 class="input-steps uui-form-element "
                 v-model="item.description"
                 v-on:input.once="setCheck(item.id)"
          />
          <epam-button @click="addStep('WHEN')" class="step-add">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </epam-button>
          <epam-button
            @click="deleteStep(item.id)"
            class="step-delete"
            v-if=" localCase.steps.filter(item => item.type ==='WHEN').length > 1 ">
            <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
          </epam-button>

        </div>
      </div>
    </div>

    <epam-button markup="large" class="lime-green" @click="saveTest">Save Tests</epam-button>
    <div>
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">Create new case after saving</label>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from './ui/EpamButton';

  /* eslint-disable */

  export default {
    components: {
      EpamButton,
    },
    data() {
      return {
        checked: false,
        entity: null,
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
      saveTest(){
        debugger;
        for(let item of this.$store.state.updateSteps) {
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
            .then((data) => {
              debugger;
             console.log(data);
            });
        }
      },
      setCheck(id) {
        let step = this.localCase.steps.find(item => item.id === id);
        this.$store.state.updateSteps.push(step);
        console.log(this.$store.state.updateSteps);
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
    props: ['localCase'],
    name: 'CaseSteps',
  };
  // export default {
  //   components: {
  //     EpamButton,
  //     draggable,
  //   },
  //   data() {
  //     return {
  //       steps: this.modifyStepsList(JSON.parse(JSON.stringify(this.value))),
  //       activeCase: this.$store.getters.getActiveCaseById(this.$route.params.caseId),
  //       getGiven: false,
  //       getThen: false,
  //       getWhen: false,
  //     };
  //   },
  //   methods: {
  //     getStepsByType() {
  //       this.activeCase.steps.forEach(item => {
  //         if (item.type === 'GIVEN'){
  //           this.getGiven.push(item);
  //         }
  //         if (item.type === 'THEN'){
  //           this.getThen.push(item);
  //         }
  //         if (item.type === 'WHEN'){
  //           this.getWhen.push(item);
  //         }
  //       });
  //     },
  //     modifyStepsList(value = []) {
  //       const steps = {
  //         given: [],
  //         when: [],
  //         then: [],
  //       };
  //
  //       steps.given = value.filter(step => step.type === 0);
  //       steps.when = value.filter(step => step.type === 1);
  //       steps.then = value.filter(step => step.type === 2);
  //
  //       return steps;
  //     },
  //     normalizeStepList() {
  //       const result = Object.keys(this.steps).reduce((r, k) => {
  //         this.steps[k].forEach(item => r.push(item));
  //         return r;
  //       }, []);
  //       return result;
  //     },
  //     updateSteps(event, set) {
  //       set.forEach((item, index) => {
  //         // eslint-disable-next-line no-param-reassign
  //         item.rowNumber = index + 1;
  //       });
  //       this.$emit('input', this.normalizeStepList());
  //     },
  //   },
  //   mounted() {
  //
  //   },
  //   props: ['value'],
  //   name: 'CaseSteps',
  //   watch: {
  //     value(n) {
  //       this.steps = this.modifyStepsList(JSON.parse(JSON.stringify(n)));
  //     },
  //   },
  //   computed: {
  //     ...mapGetters({
  //       getCase: 'getActiveCaseById',
  //     }),
  //   },
  // };
</script>


<style lang="less" scoped="true">
  @import "../assets/vendors/epam-ui/less/uui-colors";
  @import "../assets/vendors/epam-ui/less/uui-fonts";

  .caseStep{
    font-weight: initial;
    margin-top:20px;
    background: white;
    border: 1px #ebeef0 solid;
    padding: 20px 30px;
    display: flex;
    flex-wrap: wrap;
  }
  .caseSteps{
  }
  .nameCaseSteps{
    color: #d8d8d8;
    font-size: 20px;
    padding-right: 10px;

  }
  .contentCaseSteps{
    width: 85%;
    margin-left: 40px;
  }
  .contentCaseStep{
    margin-bottom: 5px;
    margin-right: 5px;
  }
  .input-steps {
    width: 85%;
    flex-grow: 2;
    color: black;
    outline: none;
    border: 1px solid @gray_border;
    background-color: @gray_input_bg;
  }
  .input-steps:focus {
    background-color: @white;
    border-color: @blue;
  }
  .step-delete{
    justify-content: flex-end;
    padding: 5px 10px;
    background-color: @white;
    border: 1px solid @white;
    border-radius: 50%;
    margin-left: 4px;
  }
  .step-delete:hover, .step-delete:active{
    background-color:#e6425d;
    border: 1px solid #e6425d;
  }
  .step-add{
    transform: rotate(45deg);
    justify-content: flex-end;
    padding: 6px 10px;
    background-color: @white;
    border: 1px solid @white;
    border-radius: 50%;
  }
  .step-add:hover,.step-add:active{
    border: 1px solid #accb59;
    background-color:#accb59;
  }
  /*@import url(../assets/vendors/epam-ui/less/uui-timeline.less);*/
  /*.timeline-section {*/
    /*& > ul {*/
      /*width: 400px;*/
      /*list-style: none;*/
      /*margin: 10px 30px;*/

      /*& > li {*/
        /*padding: 6px 18px;*/
        /*background: #e5e5e5;*/
        /*margin: 0 0 5px 0;*/
      /*}*/
    /*}*/

    /*.add-step-section {*/
      /*margin-left: 30px;*/
      /*& > button {*/
        /*margin-left: 10px;*/
      /*}*/
    /*}*/

  /*}*/



  /*.sortable-ghost {*/
    /*border: 1px dashed green;*/
  /*}*/




</style>
