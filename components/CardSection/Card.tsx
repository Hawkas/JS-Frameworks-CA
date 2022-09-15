import { Button, createStyles, Paper, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { PokemonCard } from 'types/pokemonDataType';

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');
  const overlay = getRef('overlay');
  return {
    card: {
      position: 'relative',
      height: 440,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      [`&:hover .${image}, &:hover .${overlay}`]: {
        transform: 'scale(1.03)',
      },
    },
    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },
    title: {
      fontFamily: `Greycliff CF ${theme.fontFamily}`,
      fontWeight: 900,
      color: theme.white,
      lineHeight: 1.2,
      fontSize: 32,
      marginTop: theme.spacing.xs,
      marginBottom: 32,
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },
    category: {
      color: theme.white,
      opacity: 0.9,
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    overlay: {
      ref: overlay,
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
      transition: 'transform 500ms ease',
    },
  };
});

export function Card({ images: { large: image }, name, id, types, set }: PokemonCard) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
      <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
      <div className={classes.overlay} />
      <div className={classes.content}>
        <Text className={classes.category} size="xs" sx={{ opacity: '0.7' }}>
          {set.name}
        </Text>
        <Title order={3} className={classes.title}>
          {name}
        </Title>
      </div>

      <Link href={`/pokemon/${id}`} passHref>
        <Button component="a" variant="gradient">
          Choose
        </Button>
      </Link>
    </Paper>
  );
}
