<template>
  <header>
    <div class="uui-header">
      <nav>
        <div class="uui-responsive-header">
          <div class="responsive-header">
            <a href="#" class="responsive-brand-logo">
              <span class="title">BDD Generator</span>
            </a>
          </div>
        </div>
        <div class="uui-toggle-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a href="#" class="brand-logo">
          BDD Generator
        </a>
      </nav>
      <v-button markup="blue">edit step suggestions</v-button>
    </div>
  </header>
</template>

<script>
  import VButton from './VButton';

  export default {
    components: {
      VButton,
    },
    methods: {
    },
    name: 'app-header',
  };
</script>

<style lang="less" scoped>
  header button {
    float: right;
    margin: 12px 12px 0 0;
  }
</style>
