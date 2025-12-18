import * as fs from 'fs';
import * as path from 'path';
import walkBlocks from './walk-blocks';

const RUN_ON_WORKER_GROUP_PROCESS = 'system/Common/RunOnWorkerGroup';

const readFileContent = (filePath, dependencies) => {
	const content = fs.readFileSync(filePath);
	const flow = JSON.parse(content);
	const unique = Array.from(new Set([...extractDependencies(flow.blocks || []), ...extractMetaBlocks(flow.blocks || [])]));
	dependencies.push(...unique);
}


extractDependencies = (blocks) => {
	return walkBlocks(blocks, {
		actionBlock: (bl, acc) => {
			acc.push(bl.action.split('/')[1]);
			const isRunOnWorkerGroup = bl.workerGroup !== undefined;
			if (isRunOnWorkerGroup) {
				if (acc.indexOf(RUN_ON_WORKER_GROUP_PROCESS) < 0) {
					acc.push(RUN_ON_WORKER_GROUP_PROCESS);
				}
			}
		}
	}, {
		deepWalk: (_bl, isMeta) => isMeta
	});
}

extractMetaBlocks = (blocks) => {
	return walkBlocks(blocks, {
		metaBlock: (bl, acc) => acc.push('Common')
	}, {
		entry: (_bl, isMeta) => isMeta
	});
}
const readDirContent = (dirPath, deps) => {
	const dependencies = deps || [];
	const content = fs.readdirSync(dirPath, { recursive: true });

	for (let entry of content) {
		if (content.name.endsWith('.json')) {
			readFileContent(path.join(dirPath, entry.name), dependencies);
		}
	}

	return Array.from(new Set(dependencies));
}
export default readDirContent;

