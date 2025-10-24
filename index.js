const fs = require('fs');
const path = require('path');

const excluded = new Set(['node_modules']);

const ensureManifest = (folder) => {
	const currPath = path.join(folder || '', 'manifest.json');
	const exists = fs.existsSync(currPath);

	if (!exists) {
		fs.writeFileSync(currPath, JSON.stringify({}, null, 4));
	}
}

const readFile = (folder) => {
	const currPath = path.join(folder || '', 'manifest.json');
	const content = fs.readFileSync(currPath);
	const json = JSON.parse(content);
	folder ? ensureCategoryManifestShape(json, folder) : ensureRootManifestShape(json);
	return json;
}

const readZips = (folder) => {
	const currPath = path.resolve(path.join('.', folder));
	const content = fs.readdirSync(currPath, { withFileTypes: true });
	const zips = content.filter(e => e.isFile() && e.name.endsWith('.zip')).map(e => e.name);
	return zips;
}

const main = () => {
	ensureManifest('');
	const rootManifest = readFile('');
	ensureRootManifestShape(rootManifest);
	const content = fs.readdirSync(path.resolve(''), { withFileTypes: true });
	const folders = content.filter(e => !!e.isDirectory());

	for (let folder of folders.filter(e => e)) {
		const manifest = ensureManifest(folder.name);
		ensureCategoryManifestShape(manifest, folder.name);
		const zips = readZips(folder.name);
		
		for (let zip of zips) {
			const name = zip.split('.')[0];
			if (manifest.entries.find(e => e.path === name)) {
				continue;
			}

			const cleanName = name.replace(/_/g, ' ');
			manifest.entries.push({
				name: cleanName,
				path: name,
				description: `Workflow for ${cleanName}`,
				integrations: []
			});
		}

		fs.writeFileSync(path.join(folder.name, 'manifest.json'), JSON.stringify(manifest, null, 4));
		
		let entry = rootManifest.categories.find(e => e.name === folder.name);
		if (!entry) {
			entry = {
				name: folder.name,
				path: folder.name
			}
		}

		rootManifest.categories.push(entry);
	}

	fs.writeFileSync(path.join('.', 'manifest.json'), JSON.stringify(manifest, null, 4));

}

const ensureRootManifestShape = (obj) => {
	if (!obj.name) {
		obj.name = 'Concert workflows';
	}

	if (!obj.description) {
		obj.description = 'Workflows used in concert scenarios';
	}

	if (!obj.categories) {
		obj.categories = [];
	}
}

const ensureCategoryManifestShape = (obj, category) => {
	if (!obj.name) {
		obj.name = category;
	}

	if (!obj.description) {
		obj.description = `Workflows used for ${category}`;
	}

	if (!obj.entries) {
		obj.entries = [];
	}
}

main();