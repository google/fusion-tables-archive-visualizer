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

// tslint:disable no-console

import {GeoJsonLayer, IconLayer} from '@deck.gl/layers';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import initMap from './lib/map/init-google-maps';
import initApiWithUserAuth from './lib/drive/init-api-with-user-auth';
import getParamsFromHash from './lib/get-params-from-hash';
import fetchData from './lib/drive/fetch-data';
import deckGlGeojsonLayer from './lib/deck-gl/geojson-layer';
import deckGlIconLayer from './lib/deck-gl/icon-layer';
import initInfowindow from './lib/map/init-infowindow';
import fitMapToDataBounds from './lib/map/fit-to-data-bounds';
import EmbedOverlay from './lib/embed-overlay';
import {showIsLargeWarning, finishLoading} from './lib/loading';
import {IStyle} from './interfaces/style';

import '../styles/main.css';

(async () => {
  const map = await initMap(process.env.GOOGLE_MAPS_API_KEY || '');
  const $signin = document.getElementById('signin');

  if (!$signin) {
    return;
  }

  await initApiWithUserAuth();
  $signin.style.display = 'none';

  const params = getParamsFromHash();

  if (!params.file) {
    console.error('Missing a file param containing the Google Drive File ID.');
    return;
  }

  if (params.large) {
    showIsLargeWarning();
  }

  const data = await fetchData(params.file);

  finishLoading();

  if (!data) {
    console.error('Coudn’t get data for that file.');
    return;
  }

  const style = params.style as IStyle;
  const geojsonLayer: GeoJsonLayer = deckGlGeojsonLayer(data, style);
  const iconLayer: IconLayer = deckGlIconLayer(data, style);
  const overlay = new GoogleMapsOverlay({
    layers: [geojsonLayer, iconLayer]
  });
  const embedOverlay = new EmbedOverlay(map, () => {
    embedOverlay.open(params.file, style);
  });

  overlay.setMap(map);
  initInfowindow(map, overlay, style);
  fitMapToDataBounds(map, data);
})();
