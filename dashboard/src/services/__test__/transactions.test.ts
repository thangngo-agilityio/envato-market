// Services
import { getTransactions, transactionHttpService } from '@app/services';

// Mocks
import { TRANSACTIONS } from '@app/mocks';

describe('Transactions service', () => {
  it('Get transactions (resolve)', async () => {
    jest
      .spyOn(transactionHttpService, 'get')
      .mockResolvedValue({ data: TRANSACTIONS });

    const transactions = await getTransactions();

    expect(transactions).toEqual(TRANSACTIONS);
  });

  it('Get transactions (reject)', async () => {
    try {
      jest.spyOn(transactionHttpService, 'get').mockRejectedValue({
        data: {
          isError: true,
        },
      });

      await getTransactions();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = (error as unknown as { data: any }).data;

      expect(err).toEqual({
        isError: true,
      });
    }
  });
});
