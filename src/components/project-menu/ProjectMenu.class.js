function Sorter(list, key, isReverse) {
  const arr = list;

  arr.forEach((item) => {
    const listItem = item;
    if (listItem.cases && listItem.cases.length) {
      listItem.cases = Sorter(listItem.cases, key, isReverse);
    }
    return listItem;
  });

  arr.sort((a, b) => {
    const x = a[key]; const y = b[key];
    let answer = null;
    if (x < y) {
      answer = -1;
    } else {
      answer = (x > y) ? 1 : 0;
    }
    return answer;
  });
  if (isReverse) {
    arr.reverse();
  }
  return arr;
}

class ProjectMenu {
  constructor() {
    this.items = [];
    this.sortedItems = [];
    this.filtersObj = {};
    this.exactFiltersObj = {};
  }
  setItems(data) {
    this.items = [...data];
    this.sortedItems = JSON.parse(JSON.stringify(data));
    return this;
  }
  getItems() {
    return this.items;
  }
  getFilterParams() {
    return {
      sortBy: {
        key: this.filtersObj.sortField,
        isReverse: this.filtersObj.isReverse,
      },
      searchString: this.filtersObj.searchString,
    };
  }
  getExactFilters() {
    return this.exactFiltersObj;
  }
  setFilters(obj) {
    this.filtersObj = obj;
    return this;
  }
  setExactFilters(obj) {
    this.resetSortedItems();
    this.exactFiltersObj = { ...obj };
    return this;
  }
  getSortedItems() {
    return this.sortedItems;
  }
  searchByName() {
    const str = this.getFilterParams().searchString;
    const items = [...this.items];
    if (str) {
      this.sortedItems = items.filter((s) => {
        const item = { ...s };
        item.cases = item.cases.filter(c => c.name.toLowerCase().match(new RegExp(str, 'g')));
        return item.cases.length ? item : item.name.toLowerCase().match(new RegExp(str, 'g'));
      });
    } else {
      this.sortedItems = [...this.items];
    }
    return this;
  }
  searchByExactFilters() {
    Object.keys(this.exactFiltersObj).forEach((key) => {
      if (this.exactFiltersObj[key]) {
        this.searchByExactFilterItem(key, this.exactFiltersObj[key]);
      }
    });
    return this;
  }
  searchByExactFilterItem(prop, value) {
    const items = JSON.parse(JSON.stringify(this.items));
    this.sortedItems = items.filter(s => s[prop] === value);
  }
  sortItems() {
    const filterParams = this.getFilterParams();
    const { key, isReverse } = filterParams.sortBy;
    this.sortedItems = Sorter(this.sortedItems, key, isReverse);
    return this;
  }
  resetSortedItems() {
    this.sortedItems = JSON.parse(JSON.stringify(this.items));
  }
}

export default ProjectMenu;
