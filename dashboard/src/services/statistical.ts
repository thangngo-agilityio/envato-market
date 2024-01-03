import { IAxiosConfig } from '@app/interfaces';
import { StatisticalHttpService } from '.';

export const getStatistical = async <T>(
  endPoint: string,
  config?: IAxiosConfig,
): Promise<T> => {
  const response = await StatisticalHttpService.get<T>(endPoint, config);

  return response.data;
};
