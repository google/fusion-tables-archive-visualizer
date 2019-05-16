/**
 * Return whether this is a URL of an image or not
 */
export default function(value: string): boolean {
  const lowercaseValue = value.toLowerCase();

  return (
    lowercaseValue.startsWith('http://') ||
    lowercaseValue.startsWith('https://') ||
    lowercaseValue.startsWith('//')
  );
}
