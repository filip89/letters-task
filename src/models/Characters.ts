import { directX, directY, end, letters, player, turn } from '../config.ts';

type PlayerSign = typeof player;
type EndSign = typeof end;
type TurnSign = typeof turn;
type DirectXSign = typeof directX;
type DirectYSign = typeof directY;
type Letter = (typeof letters)[number];

type Character =
  | PlayerSign
  | EndSign
  | TurnSign
  | DirectXSign
  | DirectYSign
  | Letter;

export type {
  PlayerSign,
  DirectYSign,
  DirectXSign,
  TurnSign,
  EndSign,
  Letter,
  Character,
};
