type TSortType = 'asc' | 'desc';

const compareValues = (
  prevValue: string,
  nextValue: string,
  sortOrder: TSortType,
): number => {
  const convertPrevValue: string = prevValue.toString().trim().toLowerCase();
  const convertNextValue: string = nextValue.toString().trim().toLowerCase();

  if (sortOrder === 'asc') {
    if (convertPrevValue > convertNextValue) return 1;
    if (convertPrevValue < convertNextValue) return -1;
  } else if (sortOrder === 'desc') {
    if (convertPrevValue > convertNextValue) return -1;
    if (convertPrevValue < convertNextValue) return 1;
  }

  return 0;
};

export const handleSort = (
  type: TSortType,
  prevValue: string,
  nextValue: string,
): number => compareValues(prevValue, nextValue, type);
