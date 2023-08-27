import { runMapScan } from './scripts/runMapScan.ts';
import { activeMap } from './activeMap.ts';

const result = runMapScan(activeMap);

console.log(result);
// alert(JSON.stringify(result));
