import { GetStaticProps } from 'next/types';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/WelcomeBanner/Welcome';
import { pokemonFetch } from '../lib/helpers/pokemonFetch';
import { PokeDex } from '../types/pokemonDataType';

interface DataProps {
  pokedex: PokeDex;
}
export const getStaticProps: GetStaticProps = async () => {
  const pokedex = await pokemonFetch();
  return { props: { pokedex } };
};

export default function HomePage(props: DataProps) {
  const {
    pokedex: { data, totalCount },
  } = props;
  console.log(totalCount);
  console.log(data);
  return (
    <>
      <Welcome />
    </>
  );
}
