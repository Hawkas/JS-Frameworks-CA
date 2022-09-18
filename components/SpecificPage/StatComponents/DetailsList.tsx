import { List, Text } from '@mantine/core';
import { PokemonCard } from 'types/pokemonDataType';

export function DetailsList(data: PokemonCard) {
  const {
    nationalPokedexNumbers,
    set: { name: setName },
    rarity,
  } = data;
  return (
    <List mt={16}>
      <List.Item icon={<Text component="strong">Pokedex Number:</Text>}>{`${
        nationalPokedexNumbers![0]
      }`}</List.Item>
      <List.Item icon={<Text component="strong">Card Set:</Text>}>{setName}</List.Item>
      <List.Item icon={<Text component="strong">Rarity:</Text>}>{rarity}</List.Item>
    </List>
  );
}
