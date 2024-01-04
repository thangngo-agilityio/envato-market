import { cleanUpSearchParam, getSearchParam } from '../url';

describe('getSearchParam function', () => {
  it('returns the correct search param string with non-empty values', () => {
    const objSearchParam = {
      param1: 'value1',
      param2: 42,
      param3: true,
    };

    const result = getSearchParam(objSearchParam);

    expect(result).toBe('?param1=value1&param2=42&param3=true');
  });

  it('returns an empty string when all values are falsy', () => {
    const objSearchParam = {
      param1: null,
      param2: 0,
      param3: false,
    };

    const result = getSearchParam(objSearchParam);

    expect(result).toBe('?');
  });

  it('handles empty object', () => {
    const objSearchParam = {};

    const result = getSearchParam(objSearchParam);

    expect(result).toBe('?');
  });

  it('handles empty string value', () => {
    const objSearchParam = {
      param1: '',
      param2: 'value2',
    };

    const result = getSearchParam(objSearchParam);

    expect(result).toBe('?param2=value2');
  });
});

describe('cleanUpSearchParam', () => {
  it('should remove empty, null, and undefined values from the searchParam object', () => {
    const inputSearchParam = {
      name: 'John',
      age: 25,
      city: '',
      gender: null,
      occupation: undefined,
    };

    const result = cleanUpSearchParam(inputSearchParam);

    expect(result).toEqual({
      name: 'John',
      age: '25',
    });
  });

  it('should handle an empty input object and return an empty object', () => {
    const inputSearchParam = {};

    const result = cleanUpSearchParam(inputSearchParam);

    expect(result).toEqual({});
  });

  it('should handle an input object with all values being empty, null, or undefined and return an empty object', () => {
    const inputSearchParam = {
      name: '',
      age: null,
      city: undefined,
    };

    const result = cleanUpSearchParam(inputSearchParam);

    expect(result).toEqual({});
  });

  it('should convert non-empty values to strings in the result object', () => {
    const inputSearchParam = {
      name: 'John',
      age: 25,
      city: 'New York',
    };

    const result = cleanUpSearchParam(inputSearchParam);

    expect(result).toEqual({
      name: 'John',
      age: '25',
      city: 'New York',
    });
  });
});
