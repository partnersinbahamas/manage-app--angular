export enum ImportantsTypes {
  'WEAK' = 'weak',
  'AVARAGE' = 'avarage',
  'STRONG' = 'strong',
}

export interface Todo {
  id: number,
  title: string,
  complete: boolean,
  date: string,
  importants: ImportantsTypes,
}
