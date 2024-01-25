import { DOTS, ERROR_MESSAGES } from '@/lib/constants';
import {
  formatAllowOnlyNumbers,
  formatAmountNumber,
  formatDecimalInput,
  formatDecimalNumber,
  formatNumberButton,
  formatPagination,
  formatUppercaseFirstLetter,
  getStatusColor,
  validatePassword,
} from '../helpers';

describe('formatNumberButton', () => {
  it('return array of numbers from 1 to numberOfPage', () => {
    const numberOfPage = 5;
    const result = formatNumberButton(numberOfPage);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it('return an empty array when numberOfPage is 0', () => {
    const numberOfPage = 0;
    const result = formatNumberButton(numberOfPage);
    expect(result).toEqual([]);
  });

  it('return an empty array when numberOfPage is negative', () => {
    const numberOfPage = -3;
    const result = formatNumberButton(numberOfPage);
    expect(result).toEqual([]);
  });
});

describe('formatPagination', () => {
  it('should handle the case where numberOfPage is exactly 4', () => {
    const result = formatPagination({
      totalCount: 8,
      limit: 2,
      currentPage: 1,
      arrOfCurrButtons: [],
    });

    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle the case where numberOfPage is less than 4', () => {
    const result = formatPagination({
      totalCount: 6,
      limit: 2,
      currentPage: 1,
      arrOfCurrButtons: [],
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('return return an array of page buttons around the current page when the number of pages is greater than 4', () => {
    const result = formatPagination({
      totalCount: 20,
      limit: 2,
      currentPage: 1,
      arrOfCurrButtons: [],
    });

    expect(result).toEqual([1, 2, 3, DOTS, 10]);
  });

  it('should handle the case where currentPage is near the end', () => {
    const result = formatPagination({
      totalCount: 15,
      limit: 2,
      currentPage: 7,
      arrOfCurrButtons: [],
    });

    expect(result).toEqual([4, 5, 6, 7, 8]);
  });
});

describe('validatePassword', () => {
  it('return true when data valid', () => {
    const checkValidatePassword = validatePassword('Abcd@12345');
    expect(checkValidatePassword).toBe(true);
  });
  it('return message when data empty or do not exits', () => {
    const checkValidatePassword = validatePassword('');
    expect(checkValidatePassword).toBe(
      ERROR_MESSAGES.FIELD_REQUIRED('Password'),
    );
  });
  it('return message when data less than 8 characters', () => {
    const checkValidatePassword = validatePassword('1234567');
    expect(checkValidatePassword).toBe(ERROR_MESSAGES.PASS_WORD_SHORT);
  });

  it('return message when data in valid', () => {
    const checkValidatePassword = validatePassword('123456789');
    expect(checkValidatePassword).toBe(ERROR_MESSAGES.PASS_WORD_WEAK);
  });
});

describe('formatUppercaseFirstLetter', () => {
  it('format data correctly', () => {
    const value = formatUppercaseFirstLetter('test');
    expect(value).toBe('Test');
  });

  it('format empty string data empty', () => {
    const value = formatUppercaseFirstLetter();
    expect(value).toBe('');
  });
});

describe('formatDecimalInput', () => {
  it('format valid decimal input', () => {
    // Test with valid decimal input
    const result = formatDecimalInput('123.45');
    expect(result).toBe('123.45');
  });

  it('format non-digit characters', () => {
    // Test with invalid characters
    const result = formatDecimalInput('$1,234.56');
    expect(result).toBe('1234.56');
  });

  it('format empty input', () => {
    const result = formatDecimalInput();
    expect(result).toBe('');
  });

  it('format non-decimal input', () => {
    const result = formatDecimalInput('abc');
    expect(result).toBe('');
  });

  it('format multiple decimal points', () => {
    const result = formatDecimalInput('12.34.56');
    expect(result).toBe('12.34');
  });

  it('format negative value', () => {
    const result = formatDecimalInput('-123.45');
    expect(result).toBe('123.45');
  });
});

describe('formatDecimalNumber', () => {
  it('format a decimal number with two decimal places by default', () => {
    expect(formatDecimalNumber(1234.5678)).toBe('1,234.57');
  });

  it('round the number if isOmitDecimals is true', () => {
    expect(formatDecimalNumber(1234.5678, true)).toBe('1,235');
  });

  it('format a whole number with commas if isOmitDecimals is true', () => {
    expect(formatDecimalNumber(1234567, true)).toBe('1,234,567');
  });

  it('format a negative number with commas and two decimal places', () => {
    expect(formatDecimalNumber(-9876.54321)).toBe('-9,876.54');
  });

  it('format zero with two decimal places', () => {
    expect(formatDecimalNumber(0)).toBe('0.00');
  });

  it('handles undefined input gracefully', () => {
    expect(formatDecimalNumber(undefined)).toBe('0.00');
  });
});

describe('formatAmountNumber', () => {
  it('formats amount number correctly', () => {
    expect(formatAmountNumber('1,234.56')).toBe('1,234.56');

    expect(formatAmountNumber('1234')).toBe('1,234');

    expect(formatAmountNumber('5678.90')).toBe('5,678.90');

    expect(formatAmountNumber('12,345')).toBe('12,345');

    expect(formatAmountNumber('abc')).toBe('');

    expect(formatAmountNumber('NaN')).toBe('');

    expect(formatAmountNumber('')).toBe('');

    expect(formatAmountNumber('123.4567')).toBe('123.45');

    expect(formatAmountNumber('1,234.5678')).toBe('1,234.56');
  });

  it('removes non-digit characters correctly', () => {
    expect(formatAllowOnlyNumbers('abc123')).toBe('123');

    expect(formatAllowOnlyNumbers('456')).toBe('456');

    expect(formatAllowOnlyNumbers('!@#$%^&*()')).toBe('');

    expect(formatAllowOnlyNumbers(' 7 8 9 ')).toBe('789');

    expect(formatAllowOnlyNumbers('1a2b3c4d5e')).toBe('12345');

    expect(formatAllowOnlyNumbers(undefined)).toBe('');

    expect(formatAllowOnlyNumbers(null)).toBe('');

    expect(formatAllowOnlyNumbers('')).toBe('');
  });

  it('returns the correct color for different statuses', () => {
    expect(getStatusColor('online')).toBe('green.500');

    expect(getStatusColor('offline')).toBe('gray.500');

    expect(getStatusColor('ONLINE')).toBe('green.500');

    expect(getStatusColor('unknown')).toBe('gray.500');
  });
});
