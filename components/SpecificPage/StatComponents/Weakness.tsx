import { Box, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { Weakness } from 'types/pokemonDataType';
import { EnergyIcon } from './EnergyIcon';

export function Weakness({ weakness, index }: WeaknessProps): JSX.Element {
  const { type, value } = weakness;
  return (
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }} key={index}>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Tooltip label={type} refProp="innerRef">
          <EnergyIcon style={{ width: '20px', height: 'auto' }} icon={type} />
        </Tooltip>
      </ThemeIcon>{' '}
      <Text component="p">{`${type} - ${value} extra damage`}</Text>
    </Box>
  );
}
interface WeaknessProps {
  weakness: Weakness;
  index: number;
}
