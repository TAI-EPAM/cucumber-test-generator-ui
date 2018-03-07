<template>
  <i class="fa" :class="getClass()"></i>
</template>

<script>
  import PriorityMap from '@/constants/Priority';

  export default {
    methods: {
      getClass() {
        const item = PriorityMap.get(this.value);
        return item.className;
      },
    },
    name: 'PriorityIcon',
    props: ['value'],
  };
</script>

<style lang="less" scoped>
  .fa {
    font-size: 16px;
    &.raspberry {
      color: #e4445f;
    }
    &.green {
      color: #a3c644;
    }
    &.blue {
      color: #39c2d7;
    }
    &.orange {
      color: #ff9b19
    }
    &.fa-arrow-up, &.fa-arrow-down {
      font-size: 12px;
      font-weight: normal;
    }
  }

</style>
