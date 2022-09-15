import { Box, createStyles, Grid, Transition } from '@mantine/core';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { useEffect, useState } from 'react';
import { SetStateString } from 'types/commonTypes';
import { PokeDex } from 'types/pokemonDataType';
import { CardGrid } from './CardGrid';

const useStyles = createStyles((theme) => ({
  cardsContainer: {
    marginTop: theme.other.sectionSpacing.lg,
    marginBottom: theme.other.sectionSpacing.xxl,
    color: theme.colors.gray[6],
    minHeight: 'calc(100vh - 60px - 213px)',
  },
  cardColumn: {
    [theme.fn.smallerThan(680)]: {
      '&:not(:last-of-type)': {
        marginBottom: theme.other.largeSpacing.sm,
      },
    },
  },
  cardGrid: {
    // To avoid layout shifts.

    alignContent: 'flex-start',
  },
}));
const duration = 400;
export function CardSection({ data, value }: PokeDex & SetStateString) {
  const { classes } = useStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  // Media query hooks to control Mantine prop values
  const gutterBp = useMediaQuery('(min-width: 1200px)');

  const [transitionStage, setTransitionStage] = useState(false);
  const [dataArray, setDataArray] = useState(data);
  const content = CardGrid({
    dataArray,
    classes,
  });

  useEffect(() => {
    setDataArray(data);
    setTransitionStage(true);
  }, []);

  // This is mantine's custom hook that will ONLY run when the state of its dependencies change from their initial value.
  // I.e it doesn't run at all when component mounts.
  useDidUpdate(() => {
    // If the search query changes, it will fade out the cards.
    setTransitionStage(false);

    // Then, in a timeout function delayed to the transition's timing duration:
    setTimeout(() => {
      const newData = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase().trim())
      );

      // Set the new data as the rendered output state, while it's still invisible.
      setDataArray(newData);

      // Then reveal it
      setTransitionStage(true);
    }, duration);
  }, [value]);
  return (
    <Box className={container}>
      <Box component="section" className={classes.cardsContainer}>
        <Transition
          mounted={transitionStage}
          transition="pop"
          duration={duration}
          timingFunction="ease"
        >
          {(styles) => (
            <Grid
              style={styles}
              className={classes.cardGrid}
              gutter={gutterBp ? 48 : 24}
              m={gutterBp ? -24 : -12}
            >
              {content}
            </Grid>
          )}
        </Transition>
      </Box>
    </Box>
  );
}
