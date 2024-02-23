// Services
import { getTransactions, transactionHttpService } from '@/lib/services';

// Mocks
import { TRANSACTIONS } from '@/lib/mocks';

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
      const err = (error as unknown as { data: unknown }).data;

      expect(err).toEqual({
        isError: true,
      });
    }
  });
});
