interface AvlNode {
	value: number;
	left: AvlNode | undefined;
	right: AvlNode | undefined;
	height: number;
}

class AvlTree {
	public constructor(
		public head: AvlNode | undefined
	) {}

	public insert(node: AvlNode) {
		if (this.head === undefined) {
			this.head = node;
		}

		let currentNode = this.head;
		while (true) {
			// reject duplicates
			if (currentNode.value === node.value) {
				console.log('Duplicate value: ', node.value);
				break;
			}

			// if value of inserted node is greater than current nodes value we insert in the right subtree
			// we loop until we find a leaf node
			// otherwise we can insert the node
			if (node.value > currentNode.value) {
				if (currentNode.right !== undefined) {
					currentNode = currentNode.right;
					continue;
				}

				currentNode.right = node;
				this.balance();
				break;
			}
			else {
				if (currentNode.left !== undefined) {
					currentNode = currentNode.left;
					continue;
				}

				currentNode.left = node;
				this.balance();
				break;
			}
		}
	}

	private balance() {

	}
}