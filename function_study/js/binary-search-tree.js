"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKthValue = exports.tree = void 0;
exports.tree = {
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
const arr = [];
// 二叉树前序遍历
function preOrderTraverse(node) {
    if (node === null)
        return;
    // console.log(node.value);
    arr.push(node.value);
    preOrderTraverse(node.left);
    preOrderTraverse(node.right);
}
/**
 * 二叉树中序遍历
 */
function inOrderTraverse(node) {
    if (node === null)
        return;
    inOrderTraverse(node.left);
    arr.push(node.value);
    // console.log(node.value);
    inOrderTraverse(node.right);
}
function postOrderTraverse(node) {
    if (node === null)
        return;
    postOrderTraverse(node.left);
    postOrderTraverse(node.right);
    arr.push(node.value);
    // console.log(node.value);
}
/**
 * 寻找BST里的第k小值
 */
function getKthValue(node, k) {
    inOrderTraverse(node);
    // console.log(arr);
    return arr[k] || null;
}
exports.getKthValue = getKthValue;
// postOrderTraverse(tree);
getKthValue(exports.tree, 3);
