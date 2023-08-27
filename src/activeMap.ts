import { GameMap } from './models/GameMap.ts';
import { defaultMaps } from './maps/defaultMaps.ts';

//Set the map to see the results in your browser
//You can use any of the default maps or add your own
export const activeMap: GameMap = defaultMaps.compact.map;
