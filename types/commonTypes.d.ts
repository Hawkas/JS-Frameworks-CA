import { PokeDex } from 'pokemonDataType';

export type SetValue = React.Dispatch<SetStateAction<string>>;

export interface DataProps {
  pokedex: PokeDex;
}
export interface SetStateString {
  value: string;
  setValue: SetValue;
}
