// Services
import { getSupports, supportHttpService } from '@/lib/services';

// Mocks
import { SUPPORTS_MOCK } from '@/lib/mocks';

// Constants
import { END_POINTS } from '@/lib/constants';

type TError = {
  isError: boolean;
};

describe('Supports service', () => {
  it('Get supports (resolve)', async () => {
    jest
      .spyOn(supportHttpService, 'get')
      .mockResolvedValue({ data: SUPPORTS_MOCK });

    const employees = await getSupports(END_POINTS.SUPPORT, 1);

    expect(employees.data).toEqual(SUPPORTS_MOCK);
  });

  it('Get supports (reject)', async () => {
    try {
      jest.spyOn(supportHttpService, 'get').mockRejectedValue({
        isError: true,
      });

      await getSupports(END_POINTS.SUPPORT, 1);
    } catch (error) {
      const err = (error as unknown as TError).isError;

      expect(err).toBeTruthy();
    }
  });
});
