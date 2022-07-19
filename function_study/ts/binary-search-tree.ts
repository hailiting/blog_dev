export const tree: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};
export interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}
const arr: number[] = [];

// 二叉树前序遍历
function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  // console.log(node.value);
  arr.push(node.value);
  preOrderTraverse(node.left);
  preOrderTraverse(node.right);
}
/**
 * 二叉树中序遍历
 */
function inOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  inOrderTraverse(node.left);
  arr.push(node.value);
  // console.log(node.value);
  inOrderTraverse(node.right);
}
function postOrderTraverse(node: ITreeNode | null) {
  if (node === null) return;
  postOrderTraverse(node.left);
  postOrderTraverse(node.right);
  arr.push(node.value);
  // console.log(node.value);
}
/**
 * 寻找BST里的第k小值
 */

export function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node);
  // console.log(arr);
  return arr[k] || null;
}
// postOrderTraverse(tree);
getKthValue(tree, 3);
