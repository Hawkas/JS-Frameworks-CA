import { Box, MantineTheme, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconRun } from '@tabler/icons';
import { PokemonCard } from 'types/pokemonDataType';
import { EnergyIcon } from './EnergyIcon';

export function RetreatCost({ retreatCost, theme }: RetreatProps): JSX.Element {
  const retreatIconList =
    retreatCost && retreatCost.length > 0
      ? retreatCost.map((item, index) => {
          return (
            <Tooltip label={item} refProp="innerRef" key={index}>
              <EnergyIcon style={{ width: '20px', height: 'auto' }} icon={item} />
            </Tooltip>
          );
        })
      : 'No retreat cost';
  return (
    <Box mt={16} sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <ThemeIcon variant="light" size={40} radius={40}>
        <IconRun size={20} stroke={1.5} />
      </ThemeIcon>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Text component="p">{`Cost: `}</Text>
        <Text sx={{ display: 'flex', gap: '4px', lineHeight: '14px' }} inherit>
          {retreatIconList}
        </Text>
      </Box>
    </Box>
  );
}
interface RetreatProps extends Pick<PokemonCard, 'retreatCost'> {
  theme: MantineTheme;
}
