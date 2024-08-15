import { SortTypes } from './types';

type GetSortedProps<T> = {
  array: T[];
  key: keyof T;
  sort?: SortTypes;
};

export const getSorted = <T>({ array, key, sort }: GetSortedProps<T>) => {
  if (!sort) {
    return array;
  }

  return [...array].sort((a, b) => {
    if (a[key] < b[key]) {
      return sort === 'asc' ? -1 : 1;
    }

    if (a[key] > b[key]) {
      return sort === 'asc' ? 1 : -1;
    }

    return 0;
  });
};
