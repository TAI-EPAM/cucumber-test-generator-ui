<template>
  <ul class="uui-multiswitch priority-selector">
    <li v-for="(item, i) in values">
      <label :class="{'active' : item[0] ===  localTarget}">
        <input type="radio" :value="item[0]" v-model="localTarget" @change="changeValue" :checked="item[0] == localTarget"/>
        <span>{{item[1].title}}</span>
        <priority-icon v-model="item[0]" />
      </label>
    </li>
  </ul>
</template>

<script>
  import PriorityMap from '@/constants/Priority';
  import PriorityIcon from './PriorityIcon';

  export default {
    components: {
      PriorityMap,
      PriorityIcon,
    },
    data() {
      return {
        localTarget: JSON.parse(this.value),
        values: Array.from(PriorityMap).reverse(),
      };
    },
    methods: {
      changeValue() {
        this.$emit('input', this.localTarget);
      },
    },
    name: 'priority-select',
    props: ['value'],
    mounted() {
      console.warn(this.values);
    },
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-multiswitch";
</style>
