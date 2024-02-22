import { act } from 'react-dom/test-utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Hooks
import { useSearch } from '@/lib/hooks';

const { renderHook } = testLibReactUtils;

describe('useSearch', () => {
  it('returns search params and setSearchParam function', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
    });

    (usePathname as jest.Mock).mockReturnValue(() => '');

    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/test',
      query: { name: 'testQuery' },
      push: jest.fn(),
      replace: jest.fn(),
    });

    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams('?a=1&b=2'),
    );

    const { result } = renderHook(() => useSearch());

    expect(typeof result.current.setSearchParam).toBe('function');
  });

  it('updates URL search params correctly', () => {
    const mockPush = jest.fn();
    (usePathname as jest.Mock).mockImplementation(() => '/test');
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/test',
      query: { name: 'testQuery' },
      push: mockPush,
      replace: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams('?a=1&b=2'),
    );

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchParam('b', '3');
    });

    expect(mockPush).toHaveBeenCalledWith('/test?a=1&b=3', {
      scroll: false,
    });
  });

  it('adds a new search param if it does not exist', () => {
    const mockPush = jest.fn();
    (usePathname as jest.Mock).mockImplementation(() => '/test');
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams('?a=1'),
    );

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchParam('b', '2');
    });

    expect(mockPush).toHaveBeenCalledWith('/test?a=1&b=2', {
      scroll: false,
    });
  });

  it('does not update or add a param if value is empty', () => {
    const mockPush = jest.fn();
    (usePathname as jest.Mock).mockImplementation(() => '/test');
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams('?a=1&b=2'),
    );

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchParam('b', '');
    });

    expect(mockPush).not.toHaveBeenCalledWith('/test?a=1');

    act(() => {
      result.current.setSearchParam('c', '');
    });

    expect(mockPush).not.toHaveBeenCalledWith('/test?a=1&b=2&c=');
  });
});
