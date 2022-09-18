import energyIcons from '@public/index';
import { FC, SVGAttributes } from 'react';

interface IconProps extends SVGAttributes<SVGElement> {
  icon: string;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
}

export const EnergyIcon: FC<IconProps> = ({ icon, innerRef, ...iconProps }) => {
  const Icon = energyIcons[icon];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} ref={innerRef}>
      <Icon {...iconProps} />
    </div>
  );
};
