<template>

  <div class="uui-side-bar">
    <ul class="sidebar-menu">
      <li v-for="suit in items" class="sub-menu">
        <a href="#">
          <div class="fa fa-angle-down arrow" />
          <span>{{suit.name}}</span>
        </a>
        <ul class="sub">
          <li v-for="item in suit.cases">
            <router-link :to="{ name: 'caseView', params: { suitId: suit.id, caseId: item.id }}">
              <input type="checkbox" />
              <span>{{item.description}}</span>
            </router-link>
          </li>
          <li>
            <epam-button @click="editSuitModal(suit.id)" small>Edit suit modal</epam-button>
          </li>
        </ul>
      </li>
    </ul>

    <epam-button @click="addSuit">Open Add Suit Modal</epam-button>

  </div>
</template>

<script>
  import EpamButton from './EpamButton';
  import SuitAdd from '../SuitAdd';
  import SuitEdit from '../SuitEdit';
// eslint-disable-next-line no-unused-vars
// import { Component as Vuedal, Bus as VuedalsBus } from './popoup-vuedals';
  import UUI from '../../assets/vendors/epam-ui/js/uui-core.min';

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
            value: this.$store.getSuit(suitId),
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
    },
    mounted() {
      UUI.Sidebar.init({ open: false });
    },
    props: {
      items: {
        type: Array,
      },
    },
  };
</script>

<style scoped>
  aside .uui-side-bar {
    width: 340px;
  }

  aside .uui-side-bar ul > li.sub-menu .sub > li > a span {
    padding-left: 10px;
  }

</style>
