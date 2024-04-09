import { ReactElement, ReactNode } from 'react';
import { QueryProvider } from '@/ui/providers';
import { useSearchParams } from 'next/navigation';
import '@testing-library/jest-dom';

// Component
import Dashboard from '../page';

jest.mock('react-intersection-observer');

jest.mock('react-intersection-observer', () => ({
  InView: ({
    children,
  }: {
    children: (props: { inView: boolean; ref: () => void }) => ReactNode;
  }) => children({ inView: true, ref: jest.fn() }) as ReactElement,
}));

describe('Dashboard render', () => {
  beforeAll(async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
  });

  test('Should render match with snapshot.', async () => {
    const { container } = render(await Dashboard(), { wrapper: QueryProvider });
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
