import { PrimaryButton } from '@Buttons/PrimaryButton';
import { Contact } from '@components/Contact/Contact';
import { Box, createStyles, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';

const useFooterStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.other.largeSpacing.xxl,
    paddingBottom: 10,
    margin: '0 auto',
    gap: theme.other.largeSpacing.xxl,
  },
  upperSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: theme.other.smallSpacing.lg,
  },
  logIn: {
    color: theme.white,
    borderColor: theme.white,
  },
  logo: {
    height: 56,
    width: 274.58,
    [theme.fn.smallerThan('xs')]: {
      height: 31,
      width: 152,
    },
  },
}));

export function FooterContent() {
  const modals = useModals();
  const { classes, cx } = useFooterStyles();
  const { classes: textClass } = useTextStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const openContactModal = () => {
    modals.openContextModal('contact', {
      innerProps: {
        modalBody: <Contact />,
      },
    });
  };
  return (
    <Box component="div" className={cx(container, classes.wrapper)}>
      <Box component="div" className={classes.upperSection}>
        <PrimaryButton variant="outline" className={classes.logIn} onClick={openContactModal}>
          Contact us
        </PrimaryButton>
      </Box>
      <Text component="small" className={textClass.finePrint}>
        2022 © Torbjørn Haukås. All rights reserved.
      </Text>
    </Box>
  );
}
