import { createStyles } from '@mantine/core';

export const useSearchStyles = createStyles((theme) => ({
  searchbar: {
    width: '100%',
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.medium,
    padding: theme.other.smallSpacing.xl,
    boxShadow: theme.shadows.sm,
    borderRadius: theme.radius.md,
    border: '0',
    '&:disabled': {
      opacity: 1,
      color: theme.colors.gray[5],
      backgroundColor: theme.white,
    },
    '&::placeholder': {
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeight,
      color: theme.colors.gray[5],
    },
  },
  icon: { color: theme.colors.gray[5], fontSize: '1.3rem' },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    minWidth: '288px',
    maxWidth: '648px',
    [theme.fn.smallerThan(320)]: {
      minWidth: '100%',
    },
  },
  label: {
    color: theme.other.brandColor,
    textShadow: '0px 8px 8px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    marginBottom: theme.other.smallSpacing.xxl,
    fontWeight: 800,
  },
  dropdown: {
    '& a:not(:nth-of-type(99)': {
      textDecoration: 'none',
    },
  },
}));
