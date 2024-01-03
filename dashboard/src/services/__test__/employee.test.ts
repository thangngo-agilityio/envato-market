// Services
import { getEmployees, employeeHttpRequest } from '@app/services';

// Mocks
import { USERS_MOCK } from '@app/mocks';

type TError = {
  isError: boolean;
};

describe('Employee service', () => {
  it('Get employees (resolve)', async () => {
    jest
      .spyOn(employeeHttpRequest, 'get')
      .mockResolvedValue({ data: USERS_MOCK });

    const employees = await getEmployees();

    expect(employees).toEqual(USERS_MOCK);
  });

  it('Get employees (reject)', async () => {
    try {
      jest.spyOn(employeeHttpRequest, 'get').mockRejectedValue({
        isError: true,
      });

      await getEmployees();
    } catch (error) {
      const err = (error as unknown as TError).isError;

      expect(err).toBeTruthy();
    }
  });
});
