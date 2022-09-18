import { CardSection } from '@components/CardSection/CardSection';
import { SearchBar } from '@components/SearchBar/SearchBar';
import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { useState } from 'react';
import type { DataProps } from 'types/commonTypes';
import { Welcome } from '../components/WelcomeBanner/Welcome';
import { pokemonFetch } from '../lib/helpers/pokemonFetch';

export const getStaticProps: GetStaticProps = async () => {
  const pokedex = await pokemonFetch();
  return { props: { pokedex } };
};

export default function HomePage(props: DataProps) {
  const { pokedex } = props;
  const [value, setValue] = useState('');
  return (
    <>
      <Head>
        <title>PokemonTCG API Test</title>
        <meta property="og:title" content="PokemonTCG API Test" key="title" />
        <meta name="description" content="Doing stuff with the PokemonTCG API" key="description" />
      </Head>
      <Welcome />
      <SearchBar value={value} setValue={setValue} {...pokedex} />
      <CardSection {...pokedex} value={value} />
    </>
  );
}
