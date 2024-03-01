import dayjs from 'dayjs';

// Utils
import {
  convertDateToTime,
  convertTimeMessage,
  convertTimeStampToTime,
  formatDate,
  getCurrentTimeSeconds,
  getCurrentYear,
  getExpireTime,
  loginExpired,
} from '@/lib/utils';

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

  it('should return true if expiredTime is in the past', () => {
    const expiredTime = 500;

    const result = loginExpired(expiredTime);

    expect(result).toBe(true);
  });

  it('should convert timestamp to time in H:m:s format', () => {
    const timestamp = '2024-01-24T12:34:56';

    const result = convertTimeStampToTime(timestamp);

    expect(result).toBe(dayjs(timestamp).format('H:m:s'));
  });

  it('should convert timestamp to time in HH:mm A format', () => {
    const timestamp = 1709190601;

    const result = convertTimeMessage(timestamp);

    expect(result).toBe(dayjs.unix(timestamp).format('HH:mm A'));
  });

  it('should return "Just now" for recent date', () => {
    const recentDate = new Date().toISOString();

    const result = convertDateToTime(recentDate);

    expect(result).toBe('Just now');
  });

  it('should return correct minutes ago for dates within the last hour', () => {
    const minutesAgoDate = new Date(Date.now() - 30 * 60 * 1000).toISOString(); // 30 minutes ago

    const result = convertDateToTime(minutesAgoDate);

    expect(result).toBe('30 minutes ago');
  });

  it('should return correct hours ago for dates within the last day', () => {
    const hoursAgoDate = new Date(
      Date.now() - 5 * 60 * 60 * 1000,
    ).toISOString(); // 5 hours ago

    const result = convertDateToTime(hoursAgoDate);

    expect(result).toBe('5 hours ago');
  });

  it('should return correct days ago for dates within the last month', () => {
    const daysAgoDate = new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000,
    ).toISOString(); // 3 days ago

    const result = convertDateToTime(daysAgoDate);

    expect(result).toBe('3 days ago');
  });

  it('should return correct months ago for dates within the last year', () => {
    const monthsAgoDate = new Date(
      Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
    ).toISOString(); // 2 months ago

    const result = convertDateToTime(monthsAgoDate);

    expect(result).toBe('2 months ago');
  });

  it('should return correct years ago for dates more than a year ago', () => {
    const yearsAgoDate = new Date(
      Date.now() - 2 * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(); // 2 years ago

    const result = convertDateToTime(yearsAgoDate);

    expect(result).toBe('2 years ago');
  });

  it('should return the current time in seconds', () => {
    const result = getCurrentTimeSeconds();

    expect(result).toBeCloseTo(Date.now() / 1000, 0);
  });
});
