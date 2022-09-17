import { Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { IconHeartBroken, IconSwords } from '@tabler/icons';
import { PokemonCard } from 'types/pokemonDataType';

interface FeatureProps {
  attack?: boolean;
  data: PokemonCard;
}
export function CombatFeature({ attack, data }: FeatureProps) {
  const theme = useMantineTheme();
  let Icon = IconHeartBroken;
  let title = 'Weakness';
  if (attack) {
    Icon = IconSwords;
  }
  return (
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
  );
}
