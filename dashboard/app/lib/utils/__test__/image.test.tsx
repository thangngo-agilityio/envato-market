import { generatePlaceholder, shimmer, toBase64 } from '@/lib/utils';

const RESULT = 'VGVzdCBTdHJpbmc=';
describe('shimmer function', () => {
  it('should generate an SVG string with the specified width and height', () => {
    const width = 100;
    const height = 50;

    const result = shimmer(width, height);

    expect(result).toContain(`<svg width="${width}" height="${height}"`);
  });
});

describe('toBase64 function', () => {
  it('should convert a string to base64 encoding', () => {
    const inputString = 'Test String';

    const result = toBase64(inputString);

    expect(result).toBe(RESULT);
  });

  it('encodes string to base64 when window is undefined', () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
    });

    const inputString = 'Test String';

    const result = toBase64(inputString);

    expect(result).toBe(RESULT);
  });
});

describe('generatePlaceholder function', () => {
  it('should generate a data URL with base64-encoded shimmer SVG', () => {
    const width = 100;
    const height = 50;

    const result = generatePlaceholder(width, height);

    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
  });
});
