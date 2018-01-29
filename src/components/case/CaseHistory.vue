<template>
  <section>
   <epam-button v-if="!isOpen" @click="changeView" class="case-history-button orange">Show history</epam-button>    
    <div v-if="isOpen">
      <div class="case-history-wrapper">
         <div class="case-history-window">   
            <div class="case-history-header">
                <h3 class="history-title white">HISTORY</h3>
                <epam-button @click="changeView" class="orange">X</i></epam-button>
             </div>
          </div>
        </div>
      </div>
  </section>
</template>


<script>
  import AxiosClient from '../../utils/httpClient';
  import EpamButton from '../ui/EpamButton';

  export default {
    components: {
      EpamButton,
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      changeView() {
        this.isOpen = !this.isOpen;
      },
      fetchData() {
        AxiosClient.get(`/cucumber/suits/${this.suitId}/cases/${this.caseId}/versions`, { headers: { authorization: `${this.getToken}` } })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.warn(err);
          });
      },
    },
    mounted() {
    },
    update() {
    },
    watch: {
    },
    props: ['caseId', 'suitId'],
    name: 'case-history',
  };
</script>

<style lang="less" scoped>
@import "../../assets/vendors/epam-ui/less/uui-core.less";
@import "../../assets/vendors/epam-ui/less/uui-form-elements.less";

  .case-history-button
  {
    position: fixed;
    top: 200px;
    right: -45px;
    transform: rotate(-90deg);
  }
  .case-history-window
  {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 11000;
  background-color: #FFF;
  height: 100vh;
  width: 600px;
  }

  .case-history-header
  {
    background-color: @orange;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 10px 15px;
  }
  
  .case-history-wrapper
  {
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10500;
  }
</style>
