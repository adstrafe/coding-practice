class AvlNode {
	public constructor(
		public value: number,
		public left: AvlNode | undefined = undefined,
		public right: AvlNode | undefined = undefined,
		public height: number = 0,
		public balance: number = 0
	) {}
}

class AvlTree {
	public constructor(
		public head: AvlNode | undefined
	) {}

	public insert(value: number) {
		this.head = this.insertNode(this.head, value);
	}

	private insertNode(node: AvlNode | undefined, value: number) {
		if (node === undefined) {
			return new AvlNode(value);
		}

		if (node.value === value) {
			throw new Error(`${value} already exists.`);
		}

		if (value < node.value) {
			node.left = this.insertNode(node.left, value);
		}
		else {
			node.right = this.insertNode(node.right, value);
		}

		node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
		node.balance = this.getHeight(node.left) - this.getHeight(node.right);
		return this.balance(node);
	}

	public delete(value: number) {
		this.head = this.deleteNode(this.head, value);
	}

	private deleteNode(node: AvlNode | undefined, value: number) {
		if (node === undefined) {
			throw new Error('Node not found.');
		}

		if (value < node.value) {
			node.left = this.deleteNode(node.left, value);
		}
		else if (value > node.value) {
			node.right = this.deleteNode(node.right, value);
		}
		else {
			// If we're deleting the node with 0 or 1 child.
			if (node.left === undefined) {
				return node.right;
			}
			else if (node.right === undefined) {
				return node.left;
			}

			// If the node we're deleting has 2 children we need to get the smallest value in the right subtree
			const successor = this.getSuccessor(node.right);
			node.value = successor.value;
			node.right = this.deleteNode(node.right, successor.value);

			// Balance after deletion
			node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
			node.balance = this.getHeight(node.left) - this.getHeight(node.right);

			return this.balance(node);
		}
	}

	private getSuccessor(node: AvlNode) {
		let current = node;
		while (current.left !== undefined) {
			current = current.left;
		}

		return current;
	}

	private getHeight(node: AvlNode | undefined) {
		return node === undefined ? 0 : node.height;
	}

	private balance(node: AvlNode) {
		// left heavy
		if (node.balance > 1) {
			// left - right heavy case
			if (node.left !== undefined && node.left.balance < 0) {
				node.left = this.rotateLeft(node.left);
			}

			return this.rotateRight(node);
		}

		// right heavy
		if (node.balance < -1) {
			// right - left heavy case
			if (node.right !== undefined && node.right.balance > 0) {
				node.right = this.rotateRight(node.right);
			}

			return this.rotateLeft(node);
		}

		// If no rotation needed -> return the node itself not to break the logic
		return node;
	}

	private rotateRight(y: AvlNode) {
		const x = y.left!;
		const subTree = x.right;

		x.right = y;
		y.left = subTree;

		x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
		y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

		x.balance = this.getHeight(x.left) - this.getHeight(x.right);
		y.balance = this.getHeight(y.left) - this.getHeight(y.right);

		// return the new root of the subtree
		return x;
	}

	private rotateLeft(y: AvlNode) {
		const x = y.right!;
		const subTree = x.left;

		x.left = y;
		y.right = subTree;

		y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
		x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
		
		y.balance = this.getHeight(y.left) - this.getHeight(y.right);
		x.balance = this.getHeight(x.left) - this.getHeight(x.right);

		// return the new root of the subtree
		return x;
	}

}