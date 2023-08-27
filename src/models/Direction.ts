import { direction } from '../constants/directions.ts';

export type Direction = (typeof direction)[keyof typeof direction];
