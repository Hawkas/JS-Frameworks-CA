import axios, { AxiosRequestConfig } from 'axios';
import { PokeDex } from 'types/pokemonDataType';

axios.defaults.baseURL = 'https://api.pokemontcg.io/v2/cards';
const queryString = `?q=nationalPokedexNumbers:[0 TO 151] (rarity:"Common" OR rarity:"Uncommon" OR rarity:"Rare" OR rarity:"Rare Holo") set.name:"Base Set" -name:dark* -name:*ex`;
const orderBy = `&orderBy=set.series,nationalPokedexNumbers,set.id,set.releaseDate`;
const queryAllPokemon = `${queryString}${orderBy}`;
const queryGrassOnly = `${queryString} types:grass${orderBy}`;

export const axiosFetch = async (axiosParams: AxiosRequestConfig) => {
  try {
    const result = await axios.request(axiosParams);
    return result.data;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
};
//* In my query I'm limiting it to the original 151 pokemons from the Base series, as including all 15000 cards across the 98 card sets is redundant given the requirements of this assignment.
//* The large amount of duplicates for each card is also a hassle to deal with. The entire front page would be full of the same pokemon, for instance.

export const pokemonFetch = async (grass = false) => {
  const headers = { 'x-api-key': `${process.env.POKEMONTCG_API_KEY}` };

  //* I query based on Pokedex numbers to get the first 151 and remove special variations as much as I can without overcomplicating.
  //* To make the order of pokemon cards more varied I also sort the array by series, followed by the pokedex number. That way any duplicates will end up further back.
  //* Getting rid of additional duplicates can be done later down the line if I feel like doing it.

  const url = grass ? queryGrassOnly : queryAllPokemon;
  const method = 'GET';
  const params = { method, url, headers };
  const res = await axiosFetch(params);
  return res as PokeDex;
};
