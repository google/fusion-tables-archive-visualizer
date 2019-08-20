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
 * Google Analytics
 */
window.GoogleAnalyticsObject = 'ga';
window.ga =
  window.ga ||
  // tslint:disable-next-line only-arrow-functions
  function() {
    (window.ga.q = window.ga.q || []).push(arguments);
  };
window.ga.l = Date.now();
const script = document.createElement('script');
const existingScript = document.getElementsByTagName('script')[0];
script.async = true;
script.src = 'https://www.google-analytics.com/analytics.js';
(existingScript.parentNode as HTMLHeadElement).insertBefore(
  script,
  existingScript
);

ga('create', process.env.GOOGLE_ANALYTICS_KEY, 'auto');
ga('send', 'pageview');
