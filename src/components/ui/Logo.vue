<template>
  <div class="logo">
    <span class="icon"></span>
    <span class="title">BDD Generator</span>
  </div>
</template>

<script>
    export default {
      name: 'Logo',
    };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      background: url("../../assets/images/BDD.svg") 0 0 no-repeat;
      height: 43px;
      width: 43px;
      display: inline-block;
    }

    .title {
      font-size: 18px;
      font-family: @Oswald_Regular;
      text-transform: uppercase;
      color: @gray_dark;
    }
  }

</style>
