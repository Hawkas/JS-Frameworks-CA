import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { pokemonFetch } from '../lib/helpers/pokemonFetch';
import { GetStaticProps } from 'next/types';

export const getStaticProps: GetStaticProps = async () => {
  const data = await pokemonFetch();
  return { props: { data }, revalidate: 10 };
};

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
