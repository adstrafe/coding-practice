class AvlNode {
	public constructor(
		public value: number,
		public left: AvlNode | undefined = undefined,
		public right: AvlNode | undefined = undefined,
		public height: number = 1
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
			return;
		}

		if (value < node.value) {
			node.left = this.insertNode(node.left, value);
		}
		else {
			node.right = this.insertNode(node.right, value);
		}

		node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
		this.balance();
	}

	private getHeight(node: AvlNode | undefined) {
		return node === undefined ? 0 : node.height;
	}

	private balance() {
		// TODO
	}
}