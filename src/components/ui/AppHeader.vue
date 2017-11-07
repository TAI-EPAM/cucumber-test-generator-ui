<template>
  <header>
    <div class="holder">
      <h1 @click="headerClick">Cucumber Test Generator</h1>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      headerClick() {
        this.$router.push({ name: 'suits' });
      },
    },
    name: 'app-header',
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';

  header {
    height: 50px;
    box-sizing: border-box;
    background: $header-bg-color;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.07);
  }
  header h1 {
    display: block;
    line-height: 50px;
    margin: 0 0 0 20px;
    padding: 0 0 0 0;
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  }
</style>
