const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while(currentNode) {
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }

        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }

        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    if (!this.rootNode) {
      return false;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);
    
    function removeNode(currentNode, data) {
      if (!currentNode) {
        return null;
      }
      
      if (data < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, data);
        return currentNode;
      } else if (data > currentNode.data) {
        currentNode.right = removeNode(currentNode.right, data);
        return currentNode;
      } else {
        if (!currentNode.left && !currentNode.right) {
          return null;
        }
        
        if (!currentNode.left) {
          currentNode = currentNode.right;
          return currentNode;
        }
        
        if (!currentNode.right) {
          currentNode = currentNode.left;
          return currentNode;
        }
          
        let minNodeRight = currentNode.right;
        
        while (minNodeRight.left) {
          minNodeRight = minNodeRight.left;
        }

        currentNode.data = minNodeRight.data;
        currentNode.right = removeNode(currentNode.right, minNodeRight.data);
        return currentNode;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};