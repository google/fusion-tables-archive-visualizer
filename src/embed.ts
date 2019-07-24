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
import initMap from './scripts/lib/map/init-google-maps';
import initApiWithKey from './scripts/lib/drive/init-api-with-key';
import fetchData from './scripts/lib/drive/fetch-data';
import deckGlGeojsonLayer from './scripts/lib/deck-gl/geojson-layer';
import deckGlIconLayer from './scripts/lib/deck-gl/icon-layer';
import initInfowindow from './scripts/lib/map/init-infowindow';
import fitMapToDataBounds from './scripts/lib/map/fit-to-data-bounds';
import {IStyle} from './scripts/interfaces/style';
import {IFusiontablesArchiveEmbed} from './scripts/interfaces/archive-embed';

// tslint:disable-next-line interface-name
interface Window {
  fusiontablesArchiveEmbed?: IFusiontablesArchiveEmbed;
}

(window as Window).fusiontablesArchiveEmbed = async (
  containerSelector: string,
  apiKey: string,
  fileId: string,
  style?: IStyle
) => {
  if (!apiKey) {
    console.error('Please provide an API key for the Google Drive API.');
    return;
  }

  const map = await initMap(apiKey, containerSelector);

  if (!fileId) {
    console.error('Please provide a Google Drive File ID.');
    return;
  }

  await initApiWithKey(apiKey);
  const data = await fetchData(fileId);

  if (!data) {
    console.error('Coudn’t get data for that file.');
    return;
  }

  const geojsonLayer: GeoJsonLayer = deckGlGeojsonLayer(data, style);
  const iconLayer: IconLayer = deckGlIconLayer(data, style);
  const overlay = new GoogleMapsOverlay({
    layers: [geojsonLayer, iconLayer]
  });

  overlay.setMap(map);
  initInfowindow(map, overlay, style);
  fitMapToDataBounds(map, data);
};
