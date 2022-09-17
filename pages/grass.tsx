import { CardSection } from '@components/CardSection/CardSection';
import { SearchBar } from '@components/SearchBar/SearchBar';
import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { useState } from 'react';
import type { DataProps } from 'types/commonTypes';
import { Welcome } from '../components/WelcomeBanner/Welcome';
import { pokemonFetch } from '../lib/helpers/pokemonFetch';

export const getStaticProps: GetStaticProps = async () => {
  const pokedex = await pokemonFetch(true);
  return { props: { pokedex } };
};

export default function GrassPage(props: DataProps) {
  const { pokedex } = props;
  console.log(pokedex.data);
  const [value, setValue] = useState('');
  return (
    <>
      <Head>
        <title>Grass Zone - PokemonTCG API Test</title>
        <meta property="og:title" content="Grass Zone - PokemonTCG API Test" key="title" />
        <meta name="description" content="Grass Pokémon only" key="description" />
      </Head>
      <Welcome grass />
      <SearchBar value={value} setValue={setValue} {...pokedex} />
      <CardSection {...pokedex} value={value} />
    </>
  );
}
