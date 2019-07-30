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
 * Load & Initialize the Google Drive API for the passed in key
 */
export default function(apiKey: string): Promise<void> {
  const script = document.createElement('script');
  script.id = 'auth_script';
  script.type = 'text/javascript';
  script.src = 'https://apis.google.com/js/platform.js';
  const head = document.getElementsByTagName('head')[0];

  return new Promise(resolve => {
    script.onload = () => {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
          ]
        });
        resolve();
      });
    };
    head.appendChild(script);
  });
}
