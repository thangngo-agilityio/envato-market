import { AxiosResponse } from 'axios';

// Services
import { getStatistical, StatisticalHttpService } from '@app/services';

// Mocks
import { STATISTICAL } from '@app/mocks';
import { END_POINTS } from '@app/constants';

type TError = {
  isError: boolean;
};

describe('Statistics service', () => {
  it('Get statistics (resolve)', async () => {
    jest
      .spyOn(StatisticalHttpService, 'get')
      .mockResolvedValue({ data: STATISTICAL } as AxiosResponse);

    const statistical = await getStatistical(END_POINTS.STATISTICS);

    expect(statistical).toEqual(STATISTICAL);
  });

  it('Get statistics (reject)', async () => {
    try {
      jest.spyOn(StatisticalHttpService, 'get').mockRejectedValue({
        isError: true,
      });

      await getStatistical(END_POINTS.STATISTICS);
    } catch (error) {
      const err = (error as unknown as TError).isError;

      expect(err).toBeTruthy();
    }
  });
});
