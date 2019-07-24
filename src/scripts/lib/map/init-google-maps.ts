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

import {getGoogleMapsApiUrl, INITIAL_VIEW_STATE} from '../../config/config';

/**
 * Load & Initialize Google Maps API
 */
export default function(
  apiKey: string,
  containerSelector: string = '#map'
): Promise<google.maps.Map> {
  const script = document.createElement('script');
  script.id = 'decoder_script';
  script.type = 'text/javascript';
  script.src = getGoogleMapsApiUrl(apiKey);
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);

  const mapEl = document.querySelector(containerSelector);

  return new Promise(resolve => {
    script.onload = () => {
      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: INITIAL_VIEW_STATE.latitude,
          lng: INITIAL_VIEW_STATE.longitude
        },
        // Adding 1 to the zoom level get us close to each other
        zoom: INITIAL_VIEW_STATE.zoom + 1,
        minZoom: 2,
        tilt: INITIAL_VIEW_STATE.pitch,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      };

      const map = new google.maps.Map(mapEl, mapOptions);
      resolve(map);
    };
  });
}
