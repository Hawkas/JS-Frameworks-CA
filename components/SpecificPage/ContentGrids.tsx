import { MantineTheme, SimpleGrid } from '@mantine/core';
import { PokemonCard } from 'types/pokemonDataType';
import { Attack } from './StatComponents/Attack';
import { Weakness } from './StatComponents/Weakness';

interface AttacksProps extends Pick<PokemonCard, 'attacks'> {
  theme: MantineTheme;
}

export function AttackList({ attacks, theme }: AttacksProps): JSX.Element {
  const attackList =
    attacks && attacks.length > 0
      ? attacks.map((attack, index) => Attack({ attack, index, theme }))
      : [];
  return (
    <SimpleGrid
      mt={16}
      cols={3}
      spacing={theme.spacing.xl * 2}
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'xl' },
        { maxWidth: 755, cols: 1, spacing: 'xl' },
      ]}
    >
      {attackList}
    </SimpleGrid>
  );
}

interface WeaknessesProps extends Pick<PokemonCard, 'weaknesses'> {
  theme: MantineTheme;
}

export function WeaknessList({ weaknesses, theme }: WeaknessesProps): JSX.Element {
  const weaknessList =
    weaknesses && weaknesses.length > 0
      ? weaknesses.map((weakness, index) => Weakness({ weakness, index }))
      : [];
  return (
    <SimpleGrid
      mt={16}
      cols={1}
      spacing={theme.spacing.xl * 2}
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'xl' },
        { maxWidth: 755, cols: 1, spacing: 'xl' },
      ]}
    >
      {weaknessList}
    </SimpleGrid>
  );
}
