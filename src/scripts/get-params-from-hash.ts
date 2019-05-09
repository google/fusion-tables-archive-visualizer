/**
 * Get the GET-like params from the hash
 */
export default function(): {[key: string]: string} {
  const params: {[key: string]: string} = {};
  const hash = document.location.hash.substring(1);
  const pairs = hash.split('&');
  pairs.forEach(keyValue => {
    const firstEqual = keyValue.indexOf('=');
    const key = keyValue.substring(0, firstEqual);
    let value = keyValue.substring(firstEqual + 1);

    if (key === 'style') {
      value = JSON.parse(atob(value));
    }

    params[key] = value;
  });

  return params;
}
