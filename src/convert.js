function parseAttributesFromStr(str) {
  if (!str) {
    return {
      id: '',
      rowNumber: '',
      description: '',
      type: '',
    };
  }
  const result = str.match(/=(.*?)[,}]/ig).map(el => el.slice(1, -1)) || [];
  return {
    id: +result[0],
    rowNumber: +result[1],
    description: result[2],
    type: result[3],
  };
}
function convertSteps(commit) {
  const c = commit;
  c.propertyDifferences = c.propertyDifferences.map((item) => {
    if (item.propertyName === 'steps') {
      const i = item;
      i.oldValue = parseAttributesFromStr(item.oldValue);
      i.newValue = parseAttributesFromStr(item.newValue);
      return i;
    }
    return item;
  });
  return c;
}
export default convertSteps;

