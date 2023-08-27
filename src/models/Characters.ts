import { directX, directY, end, letters, start, turn } from '../constants/characters.ts';

type StartSign = typeof start;
type EndSign = typeof end;
type TurnSign = typeof turn;
type DirectXSign = typeof directX;
type DirectYSign = typeof directY;
type Letter = (typeof letters)[number];

type Character = StartSign | EndSign | TurnSign | DirectXSign | DirectYSign | Letter;

export type { Letter, Character };
