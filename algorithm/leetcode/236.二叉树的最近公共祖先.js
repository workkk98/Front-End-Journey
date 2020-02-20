// 这是我写的... 总结问题并非很棒
// 但好在 还是解决了 问题
var lowestCommonAncestor = function(root, p, q) {
  if(root == null) {
    return root
  }
  if(root == p && root == q) {
    return root
  }
  function solve(root,p,q) {
    let left , right;
    if(root.left) {
      left = solve(root.left,p,q);
    }
    if(root.right) {
      right = solve(root.right,p,q)
    }
    // 符合情况 直接返回结果
    if(left && left.root) {
      return left
    }
    if(right && right.root) {
      return right
    }
    // 假如自己的左右子树 返回的结果 有存在p q的情况 则返回该节点
    if( (left == p && right == q) || (left == q && right == p) ) {
      return {root : root};
    }
    if(root == p || root == q) {
      if(left || right) {
        return {root:root}
      }
    }
    if(root == p || root == q) {
      return root
    }
    // 假设以上条件都不满足而 左右子树有符合的节点 返回这些节点
    if(left || right) {
      return left || right
    }
    return false
  }
  let res = solve(root,p,q);
  return res.root
};


// 看一下答案 转自力扣

/**
【思路】
因为lowestCommonAncestor(root, p, q)的功能是找出以root为根节点的两个节点p和q的最近公共祖先，所以递归体分三种情况讨论：

如果p和q分别是root的左右节点，那么root就是我们要找的最近公共祖先
如果p和q都是root的左节点，那么返回lowestCommonAncestor(root.left,p,q)
如果p和q都是root的右节点，那么返回lowestCommonAncestor(root.right,p,q)
边界条件讨论：

如果root是null，则说明我们已经找到最底了，返回null表示没找到
如果root与p相等或者与q相等，则返回root
如果左子树没找到，递归函数返回null，证明p和q同在root的右侧，那么最终的公共祖先就是右子树找到的结点
如果右子树没找到，递归函数返回null，证明p和q同在root的左侧，那么最终的公共祖先就是左子树找到的结点
 */

var lowestCommonAncestor = function(root, p, q) {
  if(root == null || root == p || root == q) return root;
  const left = lowestCommonAncestor(root.left, p ,q);
  const right = lowestCommonAncestor(root.right, p ,q);
  if(!left) return right;
  if(!right) return left;
  return root
};


// 关键点1 这两个点 必然在二叉树上。
// 关键点2 你不需要去考虑 另外个节点在哪。遇到节点就返回即可。

// 假设 返回的左子树和右子树 都有结果 则返回本节点
// 其中一个树没有结果 那么说明 左子树或右子树获取到的节点 必然是公共祖先节点。