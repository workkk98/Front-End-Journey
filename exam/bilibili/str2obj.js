function strToObj (path) {
  const ans = {};
  let root = ans;
  for (let i = 0; i < path.length; ++i) {
    if (path[i] === '.') {
      continue;
    }
    let part = '';
    while (path[i] !== '.' && path[i] !== '[' && path[i] !== ']' && i < path.length) {
      part += path[i++]
    }
    root[part] = {};
    root = root[part];
  }

  return ans;
}

function dfs (root) {
  let keys = Object.keys(root);
  for (let i = 0; i < keys.length; ++i) {
    console.log(keys[i]);
    dfs(root[keys[i]]);
  };
}

dfs(strToObj('a[b]c.d.e'));