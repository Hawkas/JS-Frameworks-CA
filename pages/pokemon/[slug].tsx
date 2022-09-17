import { CollapsedContent } from '@components/SpecificPage/Collapse';
import { pokemonFetch } from '@helpers/pokemonFetch';
import {
  Box,
  createStyles,
  Image,
  LoadingOverlay,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { IconSwords } from '@tabler/icons';
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
              <Text>{data.flavorText}</Text>
            </Box>
            <Box component="section">
              <Title order={2}>Attacks</Title>
              <SimpleGrid
                mt={16}
                cols={3}
                spacing={theme.spacing.xl * 2}
                breakpoints={[
                  { maxWidth: 980, cols: 2, spacing: 'xl' },
                  { maxWidth: 755, cols: 1, spacing: 'xl' },
                ]}
              >
                <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <ThemeIcon sx={{ alignSelf: 'flex-start' }} variant="light" size={40} radius={40}>
                    <IconSwords size={20} stroke={1.5} />
                  </ThemeIcon>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
                      {`${data.attacks[0].name} — ${data.attacks[0].damage} damage`}
                    </Text>
                    <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                      {`Cost: ${data.attacks[0].convertedEnergyCost}`}
                    </Text>
                    <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                      {data.attacks[0].text}
                    </Text>
                  </Box>
                </Box>
              </SimpleGrid>
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
