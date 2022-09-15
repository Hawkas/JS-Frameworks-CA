import { CardSection } from '@components/CardSection/CardSection';
import { SearchBar } from '@components/SearchBar/SearchBar';
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
  console.log(pokedex.data);
  const [value, setValue] = useState('');
  return (
    <>
      <Welcome />
      <SearchBar value={value} setValue={setValue} {...pokedex} />
      <CardSection {...pokedex} value={value} />
    </>
  );
}
