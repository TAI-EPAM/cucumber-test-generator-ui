function convertSteps(commit) {
  const c = commit;
  const emptyStep = {
    id: '',
    rowNumber: '',
    description: '',
    type: '',
    comment: '',
  };
  c.propertyDifferences = c.propertyDifferences.map((item) => {
    if (item.propertyName === 'steps') {
      const i = item;
      i.oldValue = i.oldValue || emptyStep;
      i.newValue = i.newValue || emptyStep;
      return i;
    }
    return item;
  });
  return c;
}
export default convertSteps;

