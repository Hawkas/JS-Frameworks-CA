import { Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';

interface WelcomeProps {
  grass?: boolean;
}
function GradientText({
  grass,
  text,
  classes,
}: WelcomeProps & { text: string; classes: Record<'title' | 'poketext', string> }) {
  return (
    <Text
      inherit
      className={classes.poketext}
      variant="gradient"
      gradient={{ from: 'yellow', to: grass ? 'green' : 'yellow', deg: 45 }}
      component="span"
    >
      {text}
    </Text>
  );
}
export function Welcome({ grass }: WelcomeProps) {
  const { classes } = useStyles();
  const gradientText = (
    <Text
      inherit
      className={classes.poketext}
      variant="gradient"
      gradient={{ from: 'yellow', to: grass ? 'green' : 'yellow', deg: 45 }}
      component="span"
    >
      Pokémon
    </Text>
  );
  return (
    <Title className={classes.title} align="center" mt={150} mb={156}>
      Choose your {grass ? <GradientText text="Grass " classes={classes} grass /> : ''}
      <GradientText text="Pokémon" classes={classes} />
    </Title>
  );
}
