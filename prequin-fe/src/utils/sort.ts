export type SortConfig<T> = {
    key: keyof T;
    direction: 'asc' | 'desc';
  };
  
  export function sortItems<T>(items: T[], sortConfig: SortConfig<T> | null): T[] {
    if (!sortConfig) return items;
  
    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
  
      const aValueStr = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
      const bValueStr = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
  
      if (aValueStr < bValueStr) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValueStr > bValueStr) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }