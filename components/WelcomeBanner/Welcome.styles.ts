import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.other.brandColor,
    fontSize: 100,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
  poketext: {
    fontFamily: 'Arial',
    WebkitTextStrokeColor: '#3466AF !important',
    WebkitTextStroke: '4px',
    [theme.fn.smallerThan('md')]: {
      WebkitTextStroke: '2px',
    },
  },
}));
