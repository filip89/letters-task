import { runMapScan } from './functions/runMapScan.ts';
import { activeMap } from './activeMap.ts';

const result = runMapScan(activeMap);

const resultDisplay = `${result.letters} \n${result.pathCharacters}`;

// eslint-disable-next-line no-console
console.log(resultDisplay);
// alert(resultDisplay);
