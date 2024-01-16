import { memo } from 'react';
import { Menu, MenuButton } from '@chakra-ui/react';

// Components
import { IconButton } from '../..';
import { Gift } from '../../Icons';
import BonusContent from './BonusContent';

// Constants
import { DEFAULT_DISCOUNT_PERCENTAGE, LIMIT_OF_BONUS } from '@/lib/constants';

export type TBonusNotificationProps = {
  isExpired?: boolean;
  colorFill: string;
  discount?: number;
  limitOfBonus?: number;
};
const BonusNotification = ({
  isExpired = false,
  colorFill,
  discount = DEFAULT_DISCOUNT_PERCENTAGE,
  limitOfBonus = LIMIT_OF_BONUS,
}: TBonusNotificationProps) => (
  <Menu placement="bottom-end" offset={[0, 20]}>
    <MenuButton as="button">
      <IconButton hasNewNotification quantityNotification={limitOfBonus}>
        <Gift color={colorFill} />
      </IconButton>
    </MenuButton>
    {!isExpired && <BonusContent discount={discount} />}
  </Menu>
);

const BonusNotificationMemorized = memo(BonusNotification);
export default BonusNotificationMemorized;
