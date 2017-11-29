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
            <router-link :to="{ name: 'viewCase', params: { suitId: suit.id, caseId: item.id }}">
              <input type="checkbox" />
              <span>{{item.description}}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import VButton from './EpamButton';
  import UUI from '../../assets/vendors/epam-ui/js/uui-core.min';

  export default {
    components: {
      VButton,
    },
    updated() {
    },
    name: 'app-menu',
    data() {
      return {

      };
    },
    methods: {
      selectCase(caseItem, suit, e) {
        this.$router.push(
          {
            name: 'viewCase',
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
