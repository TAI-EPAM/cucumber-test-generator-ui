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
    this.exactFiltersMode = null;
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
  setExactFilters(obj, mode) {
    this.resetSortedItems();
    this.exactFiltersObj = { ...obj };
    this.exactFiltersMode = mode;
    return this;
  }
  getSortedItems() {
    return this.sortedItems;
  }
  searchByName() {
    const str = this.getFilterParams().searchString;
    const items = JSON.parse(JSON.stringify(this.sortedItems));
    if (str) {
      this.sortedItems = items.filter((s) => {
        const item = { ...s };
        item.cases = item.cases.filter(c => c.name.toLowerCase().match(new RegExp(str, 'g')));
        return item.cases.length ? item : item.name.toLowerCase().match(new RegExp(str, 'g'));
      });
    }
    return this;
  }
  searchByExactFilters() {
    Object.keys(this.exactFiltersObj).forEach((key) => {
      if (this.exactFiltersObj[key]) {
        this.searchByExactFilterItem(key, this.exactFiltersObj[key]);
        // console.warn(this.sortedItems[0]);
      }
    });

    return this;
  }

  static datesEqual(prop, value) {
    const time = new Date(prop).getTime();
    return Math.floor(time / 86400000) === Math.floor(value / 86400000);
  }

  searchByExactFilterItem(prop, value) {
    const items = JSON.parse(JSON.stringify(this.items));
    if (this.exactFiltersMode === 'case') {
      this.sortedItems = items.filter((s) => {
        const item = s;
        if (prop === 'creationDate') {
          item.cases = item.cases.filter(c => ProjectMenu.datesEqual(c[prop], value));
        } else {
          item.cases = item.cases.filter(c => c[prop] === value);
        }
        return item.cases.length !== 0 ? item : null;
      });
    } else {
// eslint-disable-next-line no-lonely-if
      if (prop === 'creationDate') {
        this.sortedItems = items.filter(s => ProjectMenu.datesEqual(s[prop], value));
      } else {
        this.sortedItems = items.filter(s => s[prop] === value);
      }
    }
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
  resetItems() {
    this.localItems = JSON.parse((JSON.stringify(this.items)));
    return this;
  }
}

export default ProjectMenu;
