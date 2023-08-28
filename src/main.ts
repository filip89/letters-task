import { runMapScan } from './functions/runMapScan.ts';
import { activeMap } from './activeMap.ts';

const result = runMapScan(activeMap);

const display = `${result.letters} \n${result.pathCharacters}`;

console.log(display);
// alert(display);
