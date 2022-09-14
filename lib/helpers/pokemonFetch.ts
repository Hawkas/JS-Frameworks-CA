import { PokemonTCG as pokemon } from 'pokemon-tcg-sdk-typescript';

export const pokemonFetch = async () => {
  const allCards = pokemon.getAllCards();
  return allCards;
};
