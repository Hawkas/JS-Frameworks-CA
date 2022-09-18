import { Box, Text, ThemeIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons';
import { PokemonCard } from 'types/pokemonDataType';

export function HealthPoints({ hp }: Pick<PokemonCard, 'hp'>): JSX.Element {
  return (
    <Box mt={16} sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <ThemeIcon variant="light" size={40} radius={40}>
        <IconHeart size={20} stroke={1.5} />
      </ThemeIcon>
      <Text component="p">{hp}</Text>
    </Box>
  );
}
