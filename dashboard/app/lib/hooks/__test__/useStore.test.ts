import { useStore } from '@/lib/hooks';

// Constants
const { renderHook } = testLibReactUtils;

describe('useStore', () => {
  it('should return the current state from the store', () => {
    const mockCallback = jest.fn((state) => state.value);
    const mockStore = jest.fn((callback) => callback({ value: 'test' }));

    const { result } = renderHook(() => useStore(mockStore, mockCallback));

    expect(result.current).toBe('test');
    expect(mockCallback).toHaveBeenCalledWith({ value: 'test' });
    expect(mockStore).toHaveBeenCalledWith(expect.any(Function));
  });
});
