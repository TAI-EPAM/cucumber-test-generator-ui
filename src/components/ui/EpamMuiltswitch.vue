<template>
    <ul v-if="values" :class="[{'large': large}, 'uui-multiswitch']">
      <li v-for="(item, i) in values">
        <label :class="{'active' : item.value ===  localTarget}">
          <input type="radio" :value="item.value" v-model="localTarget" @change="changeValue" :checked="item.value == localTarget"/>
          <span>{{item.text}}</span>
        </label>
      </li>
    </ul>
</template>

<script>
  export default {
    data() {
      return {
        localTarget: JSON.parse(this.value),
      };
    },
    methods: {
      changeValue() {
        this.$emit('input', this.localTarget);
      },
    },
    name: 'epam-multiswitch',
    props: ['large', 'values', 'value'],
  };
</script>

<style lang="less" scoped>
@import "../../assets/vendors/epam-ui/less/uui-multiswitch";
</style>
