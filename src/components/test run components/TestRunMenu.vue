<template>
  <div>
    <div>
      <ul class='test-run-suits'>
        <li v-for="item in this.localCases" class="suit-item">
          <p>{{item.name}} ({{ item.cases.length }})</p>
          <priority-icon v-model="item.priority" />
          <span>{{item.displayedStatusName}}</span>
          <ul class='test-run-cases'>
            <li v-for="secitem in item.cases" class="case-item" @click="getTestRunCase(item.id, secitem.id)">
              <p>{{secitem.name}}</p>
              <priority-icon v-model="secitem.priority" />
              <span>{{secitem.displayedStatusName}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  <div class="test-run-footer">
    <epam-button @click="finishRun" class="lime-green"><p>FINISH RUN</p></epam-button>
    <epam-button @click="testCancel" class="raspberry" ><p>TEST CANCEL</p></epam-button>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import PriorityIcon from '../ui/PriorityIcon';

  export default {
    name:'TestRunMenu',
    components: {
      EpamButton,
      PriorityIcon,
    },
  data() {
    return {
      localSuits: null,
      localCases: null,
    };
  },
  methods: {
    getSuitsandCase() {
      this.localSuits = this.$store.state.activeProject.suits.filter(item => this.$store.state.selectedObject.suits.has(item.id));
      this.localCases = JSON.parse(JSON.stringify(this.localSuits)).filter(item => item.cases = item.cases.filter(item => this.$store.state.selectedObject.cases.has(item.id)));
    },
    getTestRunCase(suitId, caseId) {
      this.$store.state.saveCaseForTestRun = { projectId: this.$store.state.activeProject.id, suitId: suitId, caseId: caseId };
      this.$router.push({ path: `/testRun/projects/${this.$store.state.activeProject.id}/suits/${suitId}/case/${caseId}` });
    },
    finishRun() {
      const suitId = this.$route.params.suitId;
      const projectId = this.$route.params.projectId;
      const caseId = +this.$route.params.caseId;
      for( let item of this.$store.state.updateStatus){
        let sandData = { displayedStatusName: item.displayedStatusName };
        debugger;
        this.$store.dispatch('updateStepAsync', { data: sandData, stepId: item.id, projectId: projectId, suitId: suitId, caseId: caseId})
          .then(() => {
          });
      }
      this.$store.state.startTestRun = null;
      this.$router.push({ path: `/projects/${this.$store.state.activeProject.id}` });
    },
    testCancel() {
      this.$store.state.startTestRun = null;
      this.$router.push({ path: `/projects/${this.$store.state.activeProject.id}` });
    },
  },
    mounted() {
        this.getSuitsandCase();
    },
  }
</script>

<style lang="less" scoped >
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .case-item {
    display: block;
    padding-left: 66px;
    padding-right: 32px;
    position: relative;
    background-color: #2B2B2B;
    p{
      float: left;
      margin-right: 10px;
    }
    priority-icon {
      float: right;
    }
    span{
      float: right;
    }
  }
  .suit-item {
    margin-left: 26px;
    margin-right: 10px;
    font-size: 14px;
    letter-spacing: 0;
    font-family: "Oswald Light";
    text-transform: none;
    color: @gray_light;
    p{
      float: left;
      margin-right: 10px;
    }
    priority-icon {
     float: right;
    }
    span{
      float: right;
    }
  }
</style>
