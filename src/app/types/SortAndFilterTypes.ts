export enum FSObjectFilter {
  all = 'all',
  directories = 'directories',
  files = 'files'
}

export enum SortMode {
  name = 'name',
  size = 'size',
  type = 'type'
}

export enum SortDirection {
  ascending = 'ascending',
  descending = 'descending'
}

export const SortDirectionMap = new Map([
  ['asc', SortDirection.ascending],
  ['desc', SortDirection.descending]
])
