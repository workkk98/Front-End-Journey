// 实现一个html-parse

let demo = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>html-parser</title>
  </head>
  <body>
    <h1>HTML-PARSERs</h1>
    <div>
      <label>input<button>clickme</button></label>
      <input>
    </div>
  </body>
  </html>
`

function parseNode (nodeStr) {
  const tagNameCatch = nodeStr.match(/<([!\w]*)\b/);

  if (tagNameCatch === null) {
    throw Error('tagName error')
  }

  const tagName = tagNameCatch[1];
  const nameValueRe = /([\w]+)="(\w*)"/;
  const attrs = {};
  let pairArray;

  while (pairArray = nameValueRe.exec(nodeStr) !== null) {
    Object.assign(attrs, {
      [pairArray[1]]: pairArray[2]
    })
  }

  return createNode(tagName, attrs)
}

function createNode (tag, attrs) {
  return {
    tag,
    ...attrs,
    children: []
  };
}

function parser (htmlStr) {
  let status = 0;

  let notCloseTag = ['!DOCTYPE', 'meta', 'input'];
  let tree = [],
      leftArrowIndex = 0,
      stack = [];

  for (let idx = 0; idx < htmlStr.length; ++idx) {
    let char = htmlStr[idx];

    if (status === 0 && char === '<') {
      leftArrowIndex = idx;

      if (htmlStr[idx+1] === '/') {
        status = 3;
      } else {
        status = 1;
      }
    } else if (status === 1 && char === '>') {
      let nodeStr = htmlStr.slice(leftArrowIndex, idx+1);
      let node = parseNode(nodeStr);

      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.children.push(node);
      } else {
        tree.push(node)
      }

      if (!notCloseTag.includes(node.tag)) {
        stack.push(node);
      }

      status = 0;
    } else if (status === 3 && char === '>') {
      let closeTagName = htmlStr.slice(leftArrowIndex, idx+1).match(/<\/(\w*)\b/)[1];
      let before = stack.pop();
      if (!closeTagName || before.tag !== closeTagName) {
        throw Error("closeTagName error")
      } 

      status = 0;
    }
  }


   return tree;
}

console.log(parser(demo))