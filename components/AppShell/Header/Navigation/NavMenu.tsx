import { Contact } from '@components/Contact/Contact';
import { LoadingOverlay } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { NavLink, NavLinkProps } from './NavLink';

interface Links {
  href: string;
  component: 'a' | 'button';
  value: string;
  onClick?: React.MouseEventHandler;
}
export function NavMenu({ menuBreak, onClick }: Pick<NavLinkProps, 'menuBreak' | 'onClick'>) {
  const modals = useModals();
  const openContactModal = () => {
    modals.openContextModal('contact', {
      id: 'contact-us',
      innerProps: {
        modalBody: <Contact />,
      },
    });
  };
  const links: Links[] = [
    { href: '/', component: 'a', value: 'Home', onClick },
    { href: '/grass', component: 'a', value: 'Grass', onClick },
    { href: '', component: 'button', value: 'Contact us', onClick: openContactModal },
  ];
  const navMenu = links.map((item, index) => {
    return (
      <NavLink
        href={item.href}
        component={item.component}
        menuBreak={menuBreak}
        onClick={item.onClick}
        key={index}
      >
        {item.value}
      </NavLink>
    );
  });
  return <>{navMenu}</>;
}
