/**
 * Load & Initialize Google Auth
 */
export default function(): Promise<void> {
  const script = document.createElement('script');
  script.id = 'auth_script';
  script.type = 'text/javascript';
  script.src = 'https://apis.google.com/js/platform.js';
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);

  return new Promise(resolve => {
    script.onload = () => {
      gapi.signin2.render('signin', {
        scope: 'https://www.googleapis.com/auth/drive.readonly',
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
  });
}
