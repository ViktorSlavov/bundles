const META_BLOCK = /^\w+-?\w+$/;
const SUBFLOW = /^[a-zA-Z0-9][a-zA-Z0-9.\-_@ ]*[a-zA-Z0-9]*\/.*$/

export default walkBlocks = (blocks, blockCallback, validators) => {
	return blocks.reduce((acc, block) => {
		if (typeof block !== 'object') {
			return acc;
		}

		const isActionBlock = SUBFLOW.test(block.action);
		const isMetaBlock = META_BLOCK.test(block.action);

		if (validators?.entry && !validators.entry(block, isMetaBlock, isActionBlock)) {
			return acc;
		}

		if (isActionBlock && blockCallback.actionBlock) {
			blockCallback.actionBlock(block, acc);
		} else if (isMetaBlock && blockCallback.metaBlock) {
			blockCallback.metaBlock(block, acc);
		}

		if (validators?.deepWalk && !validators.deepWalk(block, isMetaBlock, isActionBlock)) {
			return acc;
		}

		acc = [
			...acc,
			// eslint-disable-next-line @typescript-eslint/no-shadow
			...Object.values(block).reduce((a, c) => {
				if (Array.isArray(c)) {
					a = [...a, ...this.walkBlocks(c, blockCallback, validators)];
				}

				return a;
			}, [])
		];

		return acc;
	}, []);
}