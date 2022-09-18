import { MantineTheme, SimpleGrid, Text } from '@mantine/core';
import { PokemonCard } from 'types/pokemonDataType';
import { AttackList, WeaknessList } from './ContentGrids';
import { ContentSection } from './ContentSection';
import { DetailsList } from './StatComponents/DetailsList';
import { HealthPoints } from './StatComponents/HealthPoints';
import { RetreatCost } from './StatComponents/RetreatCost';

interface AllTheContent {
  data: PokemonCard;
  theme: MantineTheme;
}

export function AllTheContent({ data, theme }: AllTheContent) {
  return (
    <>
      <ContentSection
        title="Description"
        content={<Text>{data.flavorText ? data.flavorText : 'No description text on card'}</Text>}
      />
      <ContentSection
        title="Attacks"
        content={<AttackList theme={theme} attacks={data.attacks} />}
      />
      <SimpleGrid
        mt={16}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        <ContentSection
          title="Weaknesses"
          content={<WeaknessList theme={theme} weaknesses={data.weaknesses} />}
        />
        <ContentSection
          title="Retreat Cost"
          content={<RetreatCost theme={theme} retreatCost={data.retreatCost} />}
        />
        <ContentSection title="Health Points" content={<HealthPoints hp={data.hp} />} />
      </SimpleGrid>
      <ContentSection title="Other Details" content={<DetailsList {...data} />} />
    </>
  );
}
