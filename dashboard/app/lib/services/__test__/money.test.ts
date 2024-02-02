import { AxiosResponse } from 'axios';

// Services
import {
  addMoneyToUser,
  moneyHttpRequest,
  sendMoneyToUser,
} from '@/lib/services';

type TError = {
  isError: boolean;
};

describe('addMoneyToUser service', () => {
  it('addMoneyToUser (resolve)', async () => {
    const mockData = {
      data: {
        message: 'add money success',
      },
    };
    jest
      .spyOn(moneyHttpRequest, 'put')
      .mockResolvedValue({ data: mockData } as AxiosResponse);

    const data = await addMoneyToUser({ amount: 10, userId: '1' });

    expect(data).toEqual(mockData);
  });

  it('addMoneyToUser (reject)', async () => {
    try {
      jest.spyOn(moneyHttpRequest, 'put').mockRejectedValue({
        isError: true,
      });

      await addMoneyToUser({ amount: 10, userId: '1' });
    } catch (error) {
      const err = (error as unknown as TError).isError;

      expect(err).toBeTruthy();
    }
  });
});

describe('sendMoneyToUser service', () => {
  it('sendMoneyToUser (resolve)', async () => {
    const mockData = {
      data: {
        message: 'send money success',
      },
    };
    jest
      .spyOn(moneyHttpRequest, 'put')
      .mockResolvedValue({ data: mockData } as AxiosResponse);

    const data = await sendMoneyToUser({
      amount: 10,
      userId: '1',
      memberId: '2',
    });

    expect(data).toEqual(mockData);
  });

  it('sendMoneyToUser (reject)', async () => {
    try {
      jest.spyOn(moneyHttpRequest, 'put').mockRejectedValue({
        isError: true,
      });

      await sendMoneyToUser({ amount: 10, userId: '1', memberId: '2' });
    } catch (error) {
      const err = (error as unknown as TError).isError;

      expect(err).toBeTruthy();
    }
  });
});
