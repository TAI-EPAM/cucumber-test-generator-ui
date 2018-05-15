<template>
  <div class="radioButton">
    <input
      type="radio"
      :id='radioId'
      :name='group'
      :value='value'
      :checked="value == check"
      @click="handleCheck">
    <label class="radioLabel" :for='radioId'>{{ label }}</label>
  </div>
</template>

<script>
    export default {
      name: 'radio-button',
      props: ['radioId', 'label', 'group', 'value', 'check'],
      data() {
        return {
        };
      },
      methods: {
        handleCheck(e) {
          this.$emit('click', e, this.value);
        },
      },
    };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";

  .radioButton {
    display: inline-block;
  }
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label
  {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 19px;
    height: 19px;
    border: 1px solid @gray_light;
    border-radius: 100%;
    background: @white;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: '';
    width: 11px;
    height: 11px;
    background: @blue;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }
</style>
