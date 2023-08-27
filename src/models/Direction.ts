import { directions } from '../constants/directions.ts';

export type Direction = (typeof directions)[keyof typeof directions];
