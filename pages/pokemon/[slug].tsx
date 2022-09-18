import { CollapsedContent } from '@components/SpecificPage/Collapse';
import { Attacks } from '@components/SpecificPage/CombatFeatures';
import { pokemonFetch } from '@helpers/pokemonFetch';
import { Box, createStyles, Image, LoadingOverlay, Text, Title } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PokemonCard } from 'types/pokemonDataType';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pokedex = await pokemonFetch();
  const data = pokedex ? pokedex.data.find((item) => item.id === params?.slug) : undefined;

  const notFound = !data;
  return { props: { data }, revalidate: 300, notFound };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokedex = await pokemonFetch();
  if (pokedex) {
    const paths = pokedex.data.map((item) => ({
      params: { slug: item.id },
    }));
    return { paths, fallback: true };
  }
  return { paths: [], fallback: true };
};

interface PageProps {
  data?: PokemonCard;
}
const useStyles = createStyles((theme) => ({
  contentWrap: {
    marginTop: '64px',
  },
}));
export default function SpecificPage({ data }: PageProps) {
  console.log(data);
  const router = useRouter();
  if (data) {
    const {
      classes: { container },
    } = useContainerStyles();
    const { classes, theme } = useStyles();
    const title = `${data.name} | PokemonTCG API Test`;
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} key="title" />
          <meta name="description" content={data.name} key="description" />
        </Head>
        <Box className={container} my={200}>
          <Box component="header">
            <Box mb={64} sx={{ margin: '0 auto', maxWidth: '540px' }}>
              <Image caption={`Artist: ${data.artist}`} src={data.images.large} />
            </Box>
            <Title align="center" order={1}>
              {data.name}
            </Title>
          </Box>
          <CollapsedContent>
            <Box component="section">
              <Title order={2}>Description</Title>
              <Text>{data.flavorText ? data.flavorText : 'No description text on card'}</Text>
            </Box>
            <Box component="section">
              <Title order={2}>Attacks</Title>
              <Attacks theme={theme} attacks={data.attacks} />
            </Box>
          </CollapsedContent>
        </Box>
      </>
    );
  }
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <meta property="og:title" content="Loading..." key="title" />
          <meta name="description" content="Loading..." key="description" />
        </Head>
        <div
          style={{
            marginTop: '60px',
            position: 'relative',
            minHeight: 'calc(100vh - 60px - 213px)',
            width: '100%',
          }}
        >
          <LoadingOverlay
            loaderProps={{ size: 'xl', variant: 'oval' }}
            visible={router.isFallback}
          />
        </div>
      </>
    );
  }
}
