<template>
  <table>
    <thead>
    <tr>
      <th></th>
      <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
        {{ key | capitalize }}
        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="entry in filteredData">
      <td><input type="checkbox" @click="select(entry)" v-model="entry.isSelected" /></td>
      <td v-for="key in columns">
        {{entry[key]}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  /* eslint-disable no-nested-ternary,no-param-reassign,arrow-body-style */

  export default {
    name: 'v-data-grid',
    props: {
      data: Array,
      columns: Array,
      filterKey: String,
      onSelect: Function,
    },
    computed: {
      filteredData() {
        const sortKey = this.sortKey;
        const filterKey = this.filterKey && this.filterKey.toLowerCase();
        const order = this.sortOrders[sortKey] || 1;
        let data = this.localData;
        if (filterKey) {
          data = data.filter((row) => {
            return Object.keys(row).some((key) => {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            });
          });
        }
        if (sortKey) {
          data = data.slice().sort((a, b) => {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        return data;
      },
    },
    data() {
      const sortOrders = {};
      this.columns.forEach((key) => {
        sortOrders[key] = 1;
      });
      return {
        sortKey: '',
        sortOrders,
        localData: this.extendData(),
      };
    },
    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
    methods: {
      extendData() {
        const extendModel = {
          isSelected: false,
        };
        const extendsData = this.data.map((item) => {
          return Object.assign(item, extendModel);
        });
        return extendsData;
      },
      sortBy(key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },
      select(entry) {
        entry.isSelected = !entry.isSelected;
        if (this.onSelect) {
          this.onSelect(entry);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  table {
    border: 1px solid #f3f4f3;
    border-radius: 2px;
    background-color: #fff;
    width:100%;
    margin: 0 0 20px 0;
  }

  th {
    background: #f3f4f3;
    cursor: pointer;
    user-select: none;
    font-weight: normal;

    &:first-of-type {
      width: 20px;
    }
  }

  td {
    background-color: #f9f9f9;


  }

  th, td {
    box-sizing: border-box;
    min-width: 20px;
    padding: 10px 20px;
  }

  th.active {
    color: #000;
  }

  th .arrow {
    opacity: 0;
  }

  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }
</style>
