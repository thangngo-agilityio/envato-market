import { convertToString } from '@/lib/utils';

describe('convertToString function', () => {
  it('should convert a value to a JSON string', () => {
    const inputObject = { key: 'value' };

    const jsonString = convertToString(inputObject);

    expect(jsonString).toEqual(JSON.stringify(inputObject));
  });
});
