/*!
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
