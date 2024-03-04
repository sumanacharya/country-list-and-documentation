/**
 * Filters an array of objects where the specified object key's value
 * starts with the given search query. The function supports nested properties using dot notation (e.g., "address.city")
 */
  
export const searchItemsByQuery = (items: any[], query: string, keyPath: string) => {
  const lowerCaseQuery = query.trim().toLowerCase();

  return items.filter(item => {
    const value = keyPath.split('.').reduce((acc, key) => acc?.[key], item);
    return String(value).toLowerCase().startsWith(lowerCaseQuery);
  });
};

