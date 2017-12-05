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
            <epam-button @click="editSuit(suit.id)" small>Edit suit</epam-button>
          </li>
        </ul>
      </li>
    </ul>

    <epam-button @click="addSuit">Add Suit</epam-button>

  </div>
</template>

<script>
  import EpamButton from './EpamButton';
  import UUI from '../../assets/vendors/epam-ui/js/uui-core.min';

  export default {
    components: {
      EpamButton,
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
        this.$router.push(
          {
            name: 'suitAdd',
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
      editSuit(suitId) {
        this.$router.push({ path: `/suits/${suitId}` });
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
