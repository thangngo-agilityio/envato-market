import { DEBOUNCE_TIME } from '@/lib/constants';

// Hooks
import { useDebounce } from '@/lib/hooks';

const { renderHook } = testLibReactUtils;

jest.useFakeTimers();
describe('useDebounce', () => {
  it('Work', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn, []));

    result.current();
    expect(mockFn).not.toHaveBeenCalled();

    result.current();
    jest.advanceTimersByTime(DEBOUNCE_TIME);
    expect(mockFn).toHaveBeenCalled();
  });
});
