'use client';

import { memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';

// Components
import {
  Box,
  Flex,
  Heading,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { Select } from '@/ui/components';
import { TOption } from '@/ui/components/common/Select';
import EfficiencyInfo from './EfficiencyInfo';

// Icons
import { Arrow } from '@/ui/components/Icons';

// Constants
import { EFFICIENCY_OPTIONS } from '@/lib/constants';

// Types
import { EFFICIENCY_MOCK } from '@/lib/mocks';

const EfficiencyComponent = () => {
  //TODO: update later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [efficiencyType, setEfficiencyType] = useState<string>('weekly');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingSelectEfficiencyType, setLoadingSelectEfficiencyType] =
    useState<boolean>(false);
  const colorFill = useColorModeValue(
    theme.colors.gray[400],
    theme.colors.white,
  );

  // const {
  //   data: efficiencyData,
  //   isLoading: isLoadingEfficiency,
  //   isError: isErrorEfficiency,
  // } = useGetStatistic<IEfficiency>(
  //   `${END_POINTS.EFFICIENCY}/${efficiencyType}`,
  // );

  const { arrival, spending, statistical } = EFFICIENCY_MOCK;

  const handleChangeSelectEfficiency = useCallback((data: TOption) => {
    setEfficiencyType(data.value);
    setLoadingSelectEfficiencyType(true);
  }, []);

  const renderTitle = useCallback(
    ({ label }: TOption) => (
      <Flex alignItems="center">
        <Text>{label}</Text>
        <Arrow color={colorFill} />
      </Flex>
    ),
    [colorFill],
  );

  // if (isErrorEfficiency)
  //   return (
  //     <Heading
  //       as="h3"
  //       color="text.primary"
  //       bgColor="background.body.secondary"
  //       rounded="lg"
  //       boxShadow="sm"
  //       p={4}
  //     >
  //       Efficiency data error
  //     </Heading>
  //   );

  return (
    <Box bg="background.component.primary" rounded="lg">
      <Flex
        py={4}
        px={5}
        borderBottom="1px"
        borderColor="border.primary"
        justifyContent="space-between"
      >
        <Heading variant="heading2Xl" as="h3">
          Efficiency
        </Heading>
        <Box w={102} h={21}>
          <Select
            options={EFFICIENCY_OPTIONS}
            size="sm"
            variant="no-background"
            renderTitle={renderTitle}
            onSelect={handleChangeSelectEfficiency}
            data-testid="select-efficiency"
          />
        </Box>
      </Flex>
      <EfficiencyInfo
        spending={spending}
        statistical={statistical}
        arrival={arrival}
      />
    </Box>
  );
};

const Efficiency = memo(EfficiencyComponent, isEqual);

export default Efficiency;
