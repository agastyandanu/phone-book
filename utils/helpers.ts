export function convertDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const dateTime = new Date(dateTimeString);
  return new Intl.DateTimeFormat('en-US', options).format(dateTime);
}
