import { formatDate, getCurrentYear, getExpireTime } from '@app/utils/time';

describe('getCurrentYear', () => {
  it('returns the current year', () => {
    const OriginalDate = global.Date;

    const mockDate = jest.spyOn(global, 'Date');

    mockDate.mockImplementation(
      () => new OriginalDate('2023-01-01T00:00:00.000Z'),
    );

    const result = getCurrentYear();

    mockDate.mockRestore();

    expect(result).toEqual(2023);
  });
});

describe('getExpireTime', () => {
  it('calculates the correct expire time for a positive dateOfExpiry', () => {
    const startDate = 1639852800; // January 1, 2022 (assuming this is a timestamp)
    const dateOfExpiry = 2; // 2 days

    const expectedResult = startDate + dateOfExpiry * 24 * 60 * 60;

    const result = getExpireTime(startDate, dateOfExpiry);

    expect(result).toBe(expectedResult);
  });

  it('returns the same start date for dateOfExpiry equal to 0', () => {
    const startDate = 1639852800; // January 1, 2022 (assuming this is a timestamp)
    const dateOfExpiry = 0; // 0 days

    const result = getExpireTime(startDate, dateOfExpiry);

    expect(result).toBe(startDate);
  });

  it('calculates the correct expire time for a negative dateOfExpiry', () => {
    const startDate = 1639852800; // January 1, 2022 (assuming this is a timestamp)
    const dateOfExpiry = -1; // -1 day

    const expectedResult = startDate + dateOfExpiry * 24 * 60 * 60;

    const result = getExpireTime(startDate, dateOfExpiry);

    expect(result).toBe(expectedResult);
  });

  it('returns NaN for NaN start date', () => {
    const startDate = NaN;
    const dateOfExpiry = 2; // 2 days

    const result = getExpireTime(startDate, dateOfExpiry);

    expect(isNaN(result)).toBe(true);
  });

  it('returns NaN for NaN dateOfExpiry', () => {
    const startDate = 1639852800; // January 1, 2022 (assuming this is a timestamp)
    const dateOfExpiry = NaN;

    const result = getExpireTime(startDate, dateOfExpiry);

    expect(isNaN(result)).toBe(true);
  });
});

describe('formatDate ', () => {
  it('should format time correctly', () => {
    const timestamp = 1632346800000;

    const formattedDate = formatDate(timestamp);

    expect(formattedDate).toBe('Sep 23, 2021');
  });

  it('should handle invalid time', () => {
    const formattedDate = formatDate(NaN);
    expect(typeof formattedDate).toBe('string');

    expect(formattedDate).toContain('Invalid Date');
  });
});
