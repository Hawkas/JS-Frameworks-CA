import { Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <Title className={classes.title} align="center" mt={100}>
      Choose your{' '}
      <Text inherit variant="gradient" component="span">
        Pokémon
      </Text>
    </Title>
  );
}
