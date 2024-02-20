import { memo } from 'react';
import { Menu, MenuButton } from '@chakra-ui/react';

// Components
import { IconButton } from '@/ui/components';
import { Gift } from '@/ui/components/Icons/';
import BonusContent from './BonusContent';

// Constants
import { DEFAULT_DISCOUNT_PERCENTAGE, LIMIT_OF_BONUS } from '@/lib/constants';

export type TBonusNotificationProps = {
  colorFill: string;
  discount?: number;
  limitOfBonus?: number;
};
const BonusNotification = ({
  colorFill,
  discount = DEFAULT_DISCOUNT_PERCENTAGE * 100,
  limitOfBonus = LIMIT_OF_BONUS,
}: TBonusNotificationProps) => (
  <Menu placement="bottom-end" offset={[0, 20]}>
    <MenuButton as="button">
      <IconButton
        ariaLabel="limit-bonus"
        hasNewNotification={!!limitOfBonus}
        quantityNotification={limitOfBonus}
      >
        <Gift color={colorFill} />
      </IconButton>
    </MenuButton>
    {!!limitOfBonus && <BonusContent discount={discount} />}
  </Menu>
);

const BonusNotificationMemorized = memo(BonusNotification);
export default BonusNotificationMemorized;
