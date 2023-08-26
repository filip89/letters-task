import { scan } from './scan.ts';

import { fakeTurnMap } from './maps/invalid/fakeTurnMap.ts';

const result = scan(fakeTurnMap);

console.log(result);
