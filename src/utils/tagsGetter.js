const tagsSet = new Set();

// eslint-disable-next-line no-unused-vars
function getTag(node) {
  node.forEach((item) => {
    tagsSet.add(item);
  });
}

function tagsGetter(list) {
  const nodes = list;
  nodes.forEach((node) => {
    if (node.tags && node.tags.length) {
      getTag(node.tags);
    }
    if (node.cases && node.cases.length) {
      tagsGetter(node.cases);
    }
  });
  return tagsSet;
}

export default tagsGetter;
