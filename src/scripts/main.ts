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

import {GeoJsonLayer, IconLayer} from '@deck.gl/layers';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import initMap from './init-google-maps';
import initAuth from './init-google-auth';
import getParamsFromHash from './get-params-from-hash';
import fetchData from './fetch-data';
import deckGlGeojsonLayer from './deck-gl-geojson-layer';
import deckGlIconLayer from './deck-gl-icon-layer';
import initInfowindow from './init-infowindow';
import fitMapToDataBounds from './fit-map-to-data-bounds';
import {IStyle} from './interfaces/style';

(async () => {
  const map = await initMap();
  const $signin = document.getElementById('signin');

  if (!$signin) {
    return;
  }

  await initAuth();
  $signin.style.display = 'none';

  const params = getParamsFromHash();

  if (!params.file) {
    return;
  }

  const data = await fetchData(params.file);

  if (!data) {
    return;
  }

  const geojsonLayer: GeoJsonLayer = deckGlGeojsonLayer(
    data,
    params.style as IStyle
  );
  const iconLayer: IconLayer = deckGlIconLayer(data, params.style as IStyle);
  const overlay = new GoogleMapsOverlay({
    layers: [geojsonLayer, iconLayer]
  });

  overlay.setMap(map);
  initInfowindow(map, overlay);
  fitMapToDataBounds(map, data);
})();
