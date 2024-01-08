'use client';

import { memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';

// Components
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import {
  Box,
  Flex,
  Heading,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';

// Icon
import { Arrow } from '@/ui/components/Icons';

// Constants
import {
  OVERALL_BALANCE_COLORS,
  REVENUE_FLOW_OPTIONS,
  REVENUE_FLOW_STATUS,
} from '@/lib/constants';

// Types
import { IRevenueFlow } from '@/lib/interfaces';

// Components
import Select, { TOption } from '@/ui/components/common/Select';

// Utils
import { formatDecimalNumber } from '@/lib/utils';

type TOverallData = Omit<IRevenueFlow, 'pending'>[];

interface OverallBalanceProps {
  total: number;
  growth: number;
  data: TOverallData;
}

const OverallBalanceComponent = ({
  data,
  total,
  growth,
}: OverallBalanceProps) => {
  const [chartData, setChartData] = useState<TOverallData>(data);

  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  const renderTitle = useCallback(
    ({ label }: TOption) => (
      <Flex alignItems="center">
        <Text>{label}</Text>
        <Arrow color={colorFill} />
      </Flex>
    ),
    [colorFill],
  );

  const handleChangeSelect = useCallback(
    ({ value }: TOption) => {
      const temp: TOverallData = [...data];
      const result: Record<string, TOverallData> = {
        'Jan,Jun': temp.slice(0, -6),
        'July,Dec': temp.slice(-6),
      };

      setChartData(result[value] || data);
    },
    [data],
  );

  return (
    <Box p={3} bg="background.component.primary" rounded="lg">
      <Flex
        py={4}
        px={{ base: 0, md: 5 }}
        borderBottom="1px"
        borderColor="border.primary"
        justifyContent="space-between"
      >
        <Box>
          <Text variant="textSm">Overall Balance</Text>
          <Flex align="center" gap={2}>
            <Heading variant="heading2Xl" as="h3">
              ${formatDecimalNumber(total)}
            </Heading>
            <Text color="primary.500">{growth}%</Text>
          </Flex>
        </Box>
        <Flex gap={7} display={{ base: 'none', lg: 'flex' }}>
          {REVENUE_FLOW_STATUS.slice(0, -1).map((item, index) => (
            <Flex key={item} gap={2} alignItems="center">
              <Box
                bgColor={OVERALL_BALANCE_COLORS[index]}
                w={3}
                height={3}
                rounded="50%"
              />
              <Text variant="textSm">{item}</Text>
            </Flex>
          ))}
        </Flex>
        <Box w={125} h="21px">
          <Select
            options={REVENUE_FLOW_OPTIONS}
            variant="no-border"
            renderTitle={renderTitle}
            onSelect={handleChangeSelect}
          />
        </Box>
      </Flex>
      <Chart
        options={{
          chart: {
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: chartData.map((item) => item.title),
            axisTicks: {
              show: false,
            },
            labels: {
              style: {
                colors: colorFill,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: colorFill,
              },
            },
          },
          legend: {
            show: false,
          },
          colors: OVERALL_BALANCE_COLORS,
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            custom: function ({ series, dataPointIndex }) {
              return `<div style="padding: 10px; background-color: black; color: common.white">
                <div>
                ${chartData[dataPointIndex].title}
                </div>
                <p>
                ${REVENUE_FLOW_STATUS[0]}: $${formatDecimalNumber(
                  series[0][dataPointIndex],
                )}
                </p>
                <p>
                ${REVENUE_FLOW_STATUS[1]}: $${formatDecimalNumber(
                  series[1][dataPointIndex],
                )}
                </p>
                </div>`;
            },
          },
        }}
        series={[
          {
            data: chartData.map(({ signed }) => signed),
          },
          {
            data: chartData.map(({ lost }) => lost),
          },
        ]}
        type="area"
        height="210"
        width="100%"
      />
    </Box>
  );
};

const OverallBalance = memo(OverallBalanceComponent, isEqual);

export default OverallBalance;
