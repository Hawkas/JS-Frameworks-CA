import { Box, MantineTheme, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { IconSwords } from '@tabler/icons';
import { Attack, PokemonCard } from 'types/pokemonDataType';

interface AttacksProps extends Pick<PokemonCard, 'attacks'> {
  theme: MantineTheme;
}

function Attack(attack: Attack, theme: MantineTheme): JSX.Element {
  const { name, damage, convertedEnergyCost: cost, text } = attack;
  return (
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <ThemeIcon sx={{ alignSelf: 'flex-start' }} variant="light" size={40} radius={40}>
        <IconSwords size={20} stroke={1.5} />
      </ThemeIcon>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
          {`${name} — ${damage} damage`}
        </Text>
        <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
          {`Cost: ${cost}`}
        </Text>
        <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
          {text}
        </Text>
      </Box>
    </Box>
  );
}

export function Attacks({ attacks, theme }: AttacksProps): JSX.Element {
  const attackList =
    attacks && attacks.length > 0 ? attacks.map((item) => Attack(item, theme)) : [];
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
