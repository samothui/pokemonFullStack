export interface Pokemon{
    name:string,
    type: Array<string>,
    weight:number,
    height:number,
    img: string
}

export interface Pokedex{
  name:string,
  type: Array<string>,
  order:number,
  weight:number,
  height:number,
  img: string,
  stSpeed: number,
  stSPDef: number,
  stSPAtt: number,
  stDef: number,
  stAtt: number,
  stHP: number,
  ability: string,
  abilityDesc: string,
}

export type SortDirection = 'asc' | 'desc' | '';
export const rotate: {[key: string]: SortDirection} = {'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}
