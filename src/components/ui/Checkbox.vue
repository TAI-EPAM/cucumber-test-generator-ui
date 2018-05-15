<template>
  <input type="checkbox" class="regular-checkbox" @click="handleClick" :checked="check"/>
</template>

<script>
    export default {
      name: 'checkbox',
      methods: {
        handleClick(e) {
          this.$emit('click', e);
        },
      },
      props: ['check'],
    };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";

  .regular-checkbox {
    appearance: none;
    height: 16px;
    width: 16px;
    background-color: #494A4A;
    border: 1px solid #848484;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 9px;
    display: inline-block;
    position: relative;
    cursor: pointer;
  }
  .regular-checkbox:active, .regular-checkbox:checked:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }
  .regular-checkbox:checked {
    background-color: #e9ecee;
    border: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: @blue;
  }
  .regular-checkbox:checked:after {
    content: '\2713';
    font-size: 14px;
    position: absolute;
    top: 0px;
    left: 3px;
    color: @blue;
  }
</style>
