import { characters } from '../constants/characters.ts';

type Letter = (typeof characters.letters)[number];

type Character = (typeof characters)[keyof Omit<typeof characters, 'letters'>] | Letter;

export type { Letter, Character };
