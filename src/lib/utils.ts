import { format, parseISO, isValid } from 'date-fns';

export function formatDate(dateInput: string | Date): string {
  try {
    let date: Date;
    
    if (typeof dateInput === 'string') {
      date = parseISO(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      // Fallback for invalid input
      return 'Invalid Date';
    }
    
    if (!isValid(date)) {
      return 'Invalid Date';
    }
    
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error, 'Input:', dateInput);
    return 'Invalid Date';
  }
}

export function formatDateShort(dateInput: string | Date): string {
  try {
    let date: Date;
    
    if (typeof dateInput === 'string') {
      date = parseISO(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      return 'Invalid Date';
    }
    
    if (!isValid(date)) {
      return 'Invalid Date';
    }
    
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error, 'Input:', dateInput);
    return 'Invalid Date';
  }
}
