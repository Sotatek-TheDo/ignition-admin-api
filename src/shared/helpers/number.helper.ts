/**
 *
 * @param value - The value to be formatted
 * @returns string - The formatted value
 *
 * @description
 * This function formats a number to a string which contains e notation
 * E.g: 1e-9 -> 0.0000001
 * E.g: 1e+9 -> 1000000000
 */
export const normalizeNumber = (value: number | string): string => {
  let parsedValue = typeof value === 'string' ? parseFloat(value) : value;

  if (Math.abs(parsedValue) < 1.0) {
    const e = parseInt(value.toString().split('e-')[1]);
    if (e) {
      parsedValue *= Math.pow(10, e - 1);
      return (
        '0.' + new Array(e).join('0') + parsedValue.toString().substring(2)
      );
    }
    return parsedValue.toString();
  }

  let e = parseInt(value.toString().split('+')[1]);
  if (e > 20) {
    e -= 20;
  }

  return parsedValue / Math.pow(10, e) + new Array(e + 1).join('0');
};
