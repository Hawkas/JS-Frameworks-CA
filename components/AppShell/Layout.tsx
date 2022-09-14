import { AppShell, createStyles, Footer, Header } from '@mantine/core';
import { settings } from 'lib/settings';
import { useState } from 'react';

import { FooterContent } from './Footer/FooterContent';
import { HeaderDropdown, HeaderTop } from './Header';

const { menuBreak, headerHeight } = settings;

const useStyles = createStyles((theme, _params, getRef) => ({
  content: {
    transition: 'opacity 0.5s ease-in-out',
    height: '100%',
  },
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  header: {
    pointerEvents: 'none',
    '& a, & button': {
      pointerEvents: 'all',
    },
    paddingRight: 'var(--removed-scroll-width)',
    transition: 'background-color 0.25s linear 0s',
    borderBottom: '1px solid transparent',
    backgroundColor: 'transparent',
    [`&.${getRef('filled')}`]: {
      borderColor: theme.colors.gray[3],
      backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.9),
    },
  },
  filled: {
    ref: getRef('filled'),
  },
  main: {
    backgroundColor: theme.other.backgroundColor,
    width: '100%',
    paddingTop: 0,
    minHeight: `calc(100vh + ${headerHeight}px)`,
    height: '100%',
    paddingBottom: 0,
  },
  footer: {
    backgroundColor: theme.other.backgroundColor,
    backgroundImage: theme.fn.linearGradient(92, theme.colors.blue[8], '#051524'),
  },
}));

type Props = Omit<React.ComponentPropsWithRef<'div'>, 'title'> & {
  children?: React.ReactNode;
};

export default function Layout({ children, ...others }: Props) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const clickEvent = () => {
    setOpened((o) => !o);
  };
  return (
    <AppShell
      ref={others.ref}
      classNames={{
        main: classes.main,
      }}
      padding={0}
      header={
        <Header fixed className={cx(classes.header, classes.filled)} height={headerHeight}>
          <HeaderTop menuBreak={menuBreak} clickEvent={clickEvent} opened={opened} />
        </Header>
      }
      navbar={
        <HeaderDropdown
          menuBreak={menuBreak}
          opened={opened}
          onClick={() => setOpened((o) => !o)}
        />
      }
      footer={
        <Footer height={214} className={classes.footer}>
          <FooterContent />
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}
