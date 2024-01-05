/**
 * Generates an SVG string with a shimmer effect.
 * @param w - The width of the SVG.
 * @param h - The height of the SVG.
 * @returns The SVG string.
 */
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#F4F4F5" offset="    20%" />
      <stop stop-color="#E8E8EA" offset="50%" />
      <stop stop-color="#F4F4F5" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#F4F4F5" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

/**
 * Converts a string to base64 encoding.
 *
 * @param {string} str - The string to be converted.
 * @return {string} The base64 encoded string.
 */
export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/**
 * Generates a data URL based on the given width and height.
 *
 * @param {number} w - The width of the image.
 * @param {number} h - The height of the image.
 * @return {string} The generated data URL.
 */
export const generatePlaceholder = (w: number, h: number): string =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
