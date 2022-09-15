import { Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <Title className={classes.title} align="center" mt={150} mb={156}>
      Choose your{' '}
      <Text
        inherit
        className={classes.poketext}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'yellow', deg: 45 }}
        component="span"
      >
        Pokémon
      </Text>
    </Title>
  );
}
