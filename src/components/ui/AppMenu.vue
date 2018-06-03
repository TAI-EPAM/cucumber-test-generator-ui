/* TODO: NOT USE Remove Later */

<template>
  <div class="uui-side-bar">
    <ul class="sidebar-menu">
      <li v-for="suit in items" class="sub-menu">
        <a>
          <div class="fa fa-angle-down arrow" />
          <span>{{suit.name}}</span>
        </a>
        <ul class="sub" style="display: block">
          <li v-for="item in suit.cases">
            <router-link :to="{ name: 'caseView', params: { suitId: suit.id, caseId: item.id }}">
              <input type="checkbox" />
              <span>{{item.name}}</span>
            </router-link>
          </li>
          <li>
            <epam-button @click="editSuitModal(suit.id)" small>Edit suit modal</epam-button>
            <epam-button @click="addCaseToSuit(suit.id)" small>Add case modal</epam-button>
            <epam-button @click="removeSuit(suit.id)" small>DEL</epam-button>
          </li>
        </ul>
      </li>
    </ul>

    <epam-button @click="addSuit">Open Add Suit Modal</epam-button>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from './EpamButton';
  import SuitAdd from '../suit/SuitAdd';
  import SuitEdit from '../suit/SuitEdit';
  import CaseAdd from '../case/CaseAdd';
  import Confirmation from '../Confimation';

  export default {
    components: {
      EpamButton,
      SuitAdd,
      SuitEdit,
    },
    updated() {
    },
    name: 'app-menu',
    data() {
      return {

      };
    },
    methods: {
      addCaseToSuit(suitId) {
        this.$vuedals.open({
          title: 'Add New Case',
          component: CaseAdd,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
            suitId,
            projectId: this.$route.params.projectId,
          },
        });
      },
      addSuit() {
        this.$vuedals.open({
          title: 'Add new Suit',
          component: SuitAdd,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
      editSuit(suitId) {
        this.$router.push({ path: `/suits/${suitId}` });
      },
      editSuitModal(suitId) {
        this.$vuedals.open({
          title: 'Edit Suit',
          component: SuitEdit,
          props: {
            value: this.getSuit(suitId),
            projectId: this.$route.params.projectId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
      selectCase(caseItem, suit, e) {
        this.$router.push(
          {
            name: 'caseView',
            params: { suitId: suit.id, caseId: caseItem.id },
          });
        e.preventDefault();
      },
      removeSuit(suitId) {
        this.$vuedals.open({
          title: 'Delete Suit',
          component: Confirmation,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$store.dispatch('deleteSuitAsync', { projectId: this.$route.params.projectId, suitId })
                .then(() => {
                  if (suitId === +this.$route.params.suitId) {
                    this.$router.push({ path: `/projects/${this.$route.params.projectId}` });
                  }
                  this.$vuedals.close();
                });
            },
          },
        });
      },
    },
    mounted() {
      // UUI.Sidebar.init({ open: false });
    },
    computed: {
      ...mapGetters(
        {
          items: 'getActiveSuits',
          getSuit: 'getActiveSuitById',
          activeProject: 'getActiveProject',
        },
      ),
    },
  };
</script>

<style scoped>
  .uui-side-bar {
    top: 0;
    width: 340px;
    display: block;
  }

  .uui-side-bar ul > li.sub-menu .sub > li > a span {
    padding-left: 10px;
  }

</style>
