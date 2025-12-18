import unzipContent from './utils/unzip.js';
import * as path from 'path';

unzipContent(path.resolve('Resilience')).then(
	e => console.log('done')
);