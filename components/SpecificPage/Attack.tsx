import { Box, MantineTheme, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconRun, IconSwords } from '@tabler/icons';
import type { Attack, PokemonCard, Weakness } from 'types/pokemonDataType';
import { EnergyIcon } from './EnergyIcon';

interface AttackProps {
  attack: Attack;
  index: number;
  theme: MantineTheme;
}

export function Attack({ attack, index, theme }: AttackProps): JSX.Element {
  const { name, damage, convertedEnergyCost: cost, text, cost: costType } = attack;
  const costIconList = costType.map((item, i) => (
    <Tooltip label={item} refProp="innerRef" key={i}>
      <EnergyIcon icon={item} />
    </Tooltip>
  ));
  return (
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }} key={index}>
      <ThemeIcon sx={{ alignSelf: 'flex-start' }} variant="light" size={40} radius={40}>
        <IconSwords size={20} stroke={1.5} />
      </ThemeIcon>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text sx={{ marginTop: theme.spacing.sm }} mb={7}>
          {`${name} — ${damage ? damage : 'No'} damage`}
        </Text>
        <Text
          mb={7}
          size="sm"
          sx={{ display: 'flex', gap: '4px', alignItems: 'center', lineHeight: 1.6 }}
        >
          {`Energy Cost: ${cost} -`}
          <Text sx={{ display: 'flex', gap: '4px', lineHeight: '14px' }} inherit>
            {costIconList}
          </Text>
        </Text>

        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }}>
          {text}
        </Text>
      </Box>
    </Box>
  );
}

interface WeaknessProps {
  weakness: Weakness;
  index: number;
}

export function Weakness({ weakness, index }: WeaknessProps): JSX.Element {
  const { type, value } = weakness;
  return (
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }} key={index}>
      <ThemeIcon sx={{ alignSelf: 'flex-start' }} variant="light" size={40} radius={40}>
        <Tooltip label={type} refProp="innerRef">
          <EnergyIcon style={{ width: '20px', height: 'auto' }} icon={type} />
        </Tooltip>
      </ThemeIcon>{' '}
      <Text component="p">{`${type} - ${value} extra damage`}</Text>
    </Box>
  );
}

interface WeaknessProps extends Pick<PokemonCard, 'retreatCost'> {
  index: number;
  theme: MantineTheme;
}

export function RetreatCost({ retreatCost, index, theme }: WeaknessProps): JSX.Element {
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
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }} key={index}>
      <ThemeIcon sx={{ alignSelf: 'flex-start' }} variant="light" size={40} radius={40}>
        <IconRun size={20} stroke={1.5} />
      </ThemeIcon>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text sx={{ marginTop: theme.spacing.sm }} mb={7}>
          {`Cost: `}
          <Text sx={{ display: 'flex', gap: '4px', lineHeight: '14px' }} inherit>
            {retreatIconList}
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
