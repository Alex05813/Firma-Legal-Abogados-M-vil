// En un archivo de utils/dateHelpers.ts
export const formatDateForInput = (date: string | Date): string => {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };