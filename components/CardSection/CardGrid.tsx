import { Grid, Title } from '@mantine/core';
import { PokemonCard } from 'types/pokemonDataType';
import { Card } from './Card';

interface CardGridProps {
  dataArray: PokemonCard[];
  classes: { cardColumn: string };
}

export function CardGrid({ dataArray, classes }: CardGridProps): JSX.Element[] {
  if (!dataArray || dataArray.length === 0) {
    return [
      <Grid.Col className={classes.cardColumn} key="Nothing" span={12}>
        <Title align="center" order={2}>
          No matching Pokémon found
        </Title>
      </Grid.Col>,
    ];
  }
  return dataArray.map((item) => (
    <Grid.Col className={classes.cardColumn} key={item.id} md={6} lg={3}>
      <Card {...item} />
    </Grid.Col>
  ));
}
