/**
 * Return whether this is a URL of an image or not
 */
export default function(value: string): boolean {
  const startsWithHttp =
    value.startsWith('http://') || value.startsWith('https://');
  const isImage =
    value.endsWith('.jpeg') ||
    value.endsWith('.jpg') ||
    value.endsWith('.png') ||
    value.endsWith('.gif') ||
    value.endsWith('.webp');

  return startsWithHttp && isImage;
}
