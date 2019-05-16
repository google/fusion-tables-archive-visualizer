/**
 * Return whether this is an URL or not
 */
export default function(value: string): boolean {
  const lowercaseValue = value.toLowerCase();

  return (
    lowercaseValue.startsWith('http://') ||
    lowercaseValue.startsWith('https://') ||
    lowercaseValue.startsWith('//')
  );
}
