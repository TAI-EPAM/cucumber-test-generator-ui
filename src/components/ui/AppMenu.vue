<template>

  <div class="uui-side-bar">
    <ul class="sidebar-menu">
      <li v-for="suit in suits" class="sub-menu">
        <a href="#">
          <div class="fa fa-angle-down arrow" />
          <span>{{suit.name}}</span>
        </a>
        <ul class="sub">
          <li v-for="item in suit.cases">
            <a href="#" @click="selectCase(item, suit, $event)">
              <input type="checkbox" />
              <span>Sub Item 2-1</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from './VButton';
  import UUI from '../../assets/vendors/epam-ui/js/uui-core.min';

  export default {
    components: {
      VButton,
    },
    updated() {
      UUI.Sidebar.init({ open: true });
    },
    name: 'app-menu',
    data() {
      return {
        suits: [],
      };
    },
    methods: {
      selectCase(caseItem, suit, e) {
        this.$bus.$emit('viewCase', { caseItem, suit });
        this.$router.push(
          {
            name: 'viewCase',
            params: { suitId: suit.id, caseId: caseItem.id },
          });
        e.preventDefault();
      },
    },
    mounted() {
      AxiosClient.get('/cucumber/suits/')
        .then((response) => {
          this.suits = response.data;
          this.init();
        })
        .catch(() => {
        });
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
