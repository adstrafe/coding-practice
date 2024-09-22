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
			console.log('Duplicate value: ', value);
			return node;
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

	private getHeight(node: AvlNode | undefined) {
		return node === undefined ? 0 : node.height;
	}

	private balance(node: AvlNode) {
		// TODO
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