<template>
  <div>
      <project-menu-filters v-bind="{ applyFilters, resetFilters, resetSearch }"
                            v-model="modificators">
      </project-menu-filters>
      <div class="testRunBody">
        <ul class='test-run-suits'>
          <li v-for="item in this.localCases" class="suit-item">
            <div class="fa arrow" @click="toggleOpen(item.id)" :class="{ 'fa-angle-right': isOpen!==item.id , 'fa-angle-down': isOpen===item.id }" />
            <p>{{item.name}} ({{ item.cases.length }})</p>
            <priority-icon v-model="item.priority" />
            <span>{{item.displayedStatusName}}</span>
            <ul class='test-run-cases'>
              <li v-for="secitem in item.cases" class="case-item" @click="getTestRunCase(item.id, secitem.id)" :class="{ 'active': isOpen===item.id }">
                <p>{{secitem.name}}</p>
                <priority-icon v-model="secitem.priority" />
                <span>{{secitem.displayedStatusName}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    <div class="test-run-footer">
      <epam-button @click="finishRun" class="lime-green button "><svgicon name="testRun" class="imgButton"></svgicon><p>FINISH RUN</p></epam-button>
      <epam-button @click="testCancel" class="raspberry button" ><svgicon name="testRunStop" class="imgButton"></svgicon><p>TEST CANCEL</p></epam-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import PriorityIcon from '../ui/PriorityIcon';
  import ProjectMenuFilters from '../project-menu/ProjectMenuFilters';
  import ProjectMenuClass from '../project-menu/ProjectMenu.class'
  import '../../assets/converted/testRun';
  import '../../assets/converted/testRunStop';

  const ProjectMenuController = new ProjectMenuClass();

  export default {
    name: 'TestRunMenu',
    computed: {
      ...mapGetters(
        {
          activeProject: 'getActiveProject',
        },
      ),
    },
    components: {
      EpamButton,
      PriorityIcon,
      ProjectMenuFilters,
    },
    data() {
      return {
        localSuits: null,
        localCases: null,
        isOpen: null,
        modificators: {
          exactFiltersMode: 'suit',
          exactFilters: {
            creationDate: null,
            status: null,
            priority: null,
          },
          filters: {
            sortField: 'id',
            isReverse: false,
            searchString: null,
          },
        },
      };
    },
    methods: {
      toggleOpen(value) {
        if (this.isOpen === value) {
          this.isOpen = null;
        } else {
          this.isOpen = value;
        }
      },
      getMenuItems() {
        const suitId = this.$route.params.suitId;
        const projectId = this.$route.params.projectId;
        const caseId = +this.$route.params.caseId;
        this.$store.dispatch('getCaseHistoryAsync', {
          projectId: projectId,
          suitId: suitId,
          caseId: caseId
        })
          .then(() => {
          });
      },
      getSuitsAndCase() {
        this.localSuits = this.activeProject.suits.filter(item => this.$store.state.selectedObject.suits.has(item.id));
        this.localCases = this.localSuits.filter(item => item.cases = item.cases.filter(item => this.$store.state.selectedObject.cases.has(item.id)));
      },
      getTestRunCase(suitId, caseId) {
        this.$router.push({path: `/testRun/projects/${this.activeProject.id}/suits/${suitId}/case/${caseId}`});
      },
      finishRun() {
        const suitId = this.$route.params.suitId;
        const projectId = this.$route.params.projectId;
        const caseId = +this.$route.params.caseId;
        for (let item of this.$store.state.updateStatus) {
          let sandData = { status: item.displayedStatusName };
          this.$store.dispatch('updateStepAsync', {
            data: sandData,
            stepId: item.id,
            projectId: projectId,
            suitId: suitId,
            caseId: caseId
          })
            .then(() => {
            });
        }
        this.$router.push({path: `/projects/${this.$store.state.activeProject.id}`});
        this.$store.state.startTestRun = null;

      },
      testCancel() {
        this.$router.push({path: `/projects/${this.$store.state.activeProject.id}`});
        this.$store.state.startTestRun = null;
      },
      resetSearch() {
      },
      applyFilters() {
      },
      resetFilters() {
      },
    },
    mounted() {
      this.getSuitsAndCase();
      if (this.items) {
        ProjectMenuController.setItems(this.items);
        this.getMenuItems();
      }
    },
  }
</script>

<style lang="less" scoped >
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .testRunBody{
    height: 740px;
  }
  .test-run-filters{
    border: 1px solid black;
    height: 60px;
  }
  .test-run-cases{
    margin-top: 20px;
  }
  .case-item {
    display: none;
    padding: 10px 32px 10px 66px;
    font-size: 12px;
    background-color: #2B2B2B;

    p{
      float: left;
    }

    priority-icon {
      float: right;
    }

    span{
      font-size: 10px;
      float: right;
    }
  }
  .active {
    display: block!important;
  }
  .suit-item {
    font-size: 12px;
    letter-spacing: 0;
    font-family: "Oswald Light";
    text-transform: none;
    color: @gray_light;
    padding-top: 20px;

    .arrow{
      float: left;
      margin-left: 20px;
    }
    p{
      margin-left:10px;
      float: left;
      margin-right: 10px;
      font-size: 14px;
    }
    priority-icon {
     float: right;
    }
    span{
      font-size: 10px;
      float: right;
      margin-right: 10px;
    }
  }
  .test-run-footer{
    display: flex;
    justify-content:space-evenly;

    .button{
      display: flex;
      justify-content:space-around;

      p{
        margin-top: 5px;
      }
    }
    .imgButton{
      margin-right: 10px;
      width: 20px;
    }
  }
</style>
