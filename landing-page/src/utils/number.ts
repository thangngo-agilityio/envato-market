/**
 * Format number rg: 12345 -> 12,345.00 if isOmitDecimals = false or 12,345 if isOmitDecimals = true
 * @param number
 * @param isOmitDecimals
 * @returns Number after format
 */
export const formatDecimalNumber = (
  number = 0,
  isOmitDecimals: boolean = false,
): string => {
  const formattedNumber = isOmitDecimals
    ? Math.round(number).toString()
    : number.toFixed(2);

  const numberWithCommas = formattedNumber.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  return numberWithCommas;
};
