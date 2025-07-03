
export interface Country {

  cca2: string;
  flag: string;
  name: string;
  flagSvg: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;

}

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';


