/**
 * Return whether this is a URL of an image or not
 */
export default function(value: string): boolean {
  const lowercaseValue = value.toLowerCase();
  const startsWithHttp =
    lowercaseValue.startsWith('http://') ||
    lowercaseValue.startsWith('https://');
  const isImage =
    lowercaseValue.endsWith('.jpeg') ||
    lowercaseValue.endsWith('.jpg') ||
    lowercaseValue.endsWith('.png') ||
    lowercaseValue.endsWith('.gif') ||
    lowercaseValue.endsWith('.webp');

  return startsWithHttp && isImage;
}
