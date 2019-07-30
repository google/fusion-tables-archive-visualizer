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
 * Load & Initialize Google Auth
 */
export default function(): Promise<void> {
  const scriptExists = document.querySelector(
    'script[src="https://apis.google.com/js/platform.js"]'
  );
  const head = document.getElementsByTagName('head')[0];
  let script: HTMLScriptElement;

  if (!scriptExists) {
    script = document.createElement('script');
    script.id = 'auth_script';
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/platform.js';
  }

  const meta = document.createElement('meta');
  meta.setAttribute('name', 'google-signin-client_id');
  meta.setAttribute('content', process.env.GOOGLE_SIGNIN_CLIENT_ID || '');
  head.appendChild(meta);

  return new Promise(resolve => {
    const signin = () => {
      gapi.client.setApiKey('');
      gapi.signin2.render('signin', {
        scope: 'https://www.googleapis.com/auth/drive.file',
        width: 240,
        height: 50,
        longtitle: true,
        onsuccess: () => {
          gapi.load('client', async () => {
            await gapi.client.init({
              discoveryDocs: [
                'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
              ]
            });
            resolve();
          });
        },
        // tslint:disable-next-line no-console
        onfailure: console.error
      });
    };

    if (scriptExists) {
      signin();
    } else {
      script.onload = signin;
      head.appendChild(script);
    }
  });
}
