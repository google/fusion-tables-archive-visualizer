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

import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {GEOJSON_LAYER_ID, ICON_LAYER_ID} from '../../config/config';
import isUrl from './is-url';
import {IStyle} from '../../interfaces/style';
import {
  getIconName,
  getIconSizeByName,
  SMALL_ICON_SIZE
} from '../deck-gl/icon-helper';

type IMarkerIconSize = 'none' | 'small' | 'large';
const OFFSET_FROM_MARKER = {
  none: 0,
  small: -7,
  large: -34
};

/**
 * Initialize an infowindow that shows the clicked data
 */
export default function(
  map: google.maps.Map,
  overlay: GoogleMapsOverlay,
  style?: IStyle
): void {
  map.addListener('mousemove', event => {
    if (!overlay._deck || !overlay._deck.layerManager) {
      return;
    }

    const {x, y} = event.pixel;
    const picked = overlay._deck.pickObject({
      x,
      y,
      radius: 0,
      layerIds: [GEOJSON_LAYER_ID, ICON_LAYER_ID]
    });
    document.body.classList.toggle('cursor-pointer', picked);
  });

  map.addListener('click', event => {
    let {latLng} = event;
    const {x, y} = event.pixel;
    const picked = overlay._deck.pickObject({
      x,
      y,
      radius: 4,
      layerIds: [GEOJSON_LAYER_ID, ICON_LAYER_ID]
    });
    let markerIconSize: IMarkerIconSize = 'none';

    if (picked && picked.layer.id === ICON_LAYER_ID) {
      const [lng, lat] = picked.object.position;
      latLng = new google.maps.LatLng(lat, lng);
      const iconSize = getIconSizeByName(getIconName(picked.object, style));
      markerIconSize = iconSize === SMALL_ICON_SIZE ? 'small' : 'large';
    }

    if (picked) {
      openInfowindow(infowindow, map, picked.object, latLng, markerIconSize);
    } else {
      infowindow.close();
    }
  });

  const infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 400
  });
}

/**
 * Open the Tooltip for the passed in object
 */
function openInfowindow(
  infowindow: google.maps.InfoWindow,
  map: google.maps.Map,
  feature: GeoJSON.Feature,
  position: google.maps.LatLng,
  markerIconSize: IMarkerIconSize
) {
  if (!feature || !feature.properties || !map || !position) {
    return;
  }

  const yOffset = OFFSET_FROM_MARKER[markerIconSize];

  infowindow.setOptions({
    pixelOffset: new google.maps.Size(0, yOffset)
  });
  infowindow.setContent(createContent(feature.properties));
  infowindow.setPosition(position);
  infowindow.open(map);
}

/**
 * Create the content for the infowindow
 */
function createContent(data: {[key: string]: any}): string {
  return `<table>
    ${Object.keys(data)
      .map(key => {
        let value = data[key];
        const title = key.replace(/::image$/, '');
        const isImageColumn = key.match(/::image$/);
        const isUrlValue = isUrl(value);

        if (isImageColumn && isUrlValue) {
          value = `<a href="${value}" target="_blank" rel="noopener"
              title="Open full image in a new tab">
            <img src="${value}" alt="" height="70" />
          </a>`;
        } else if (isUrlValue) {
          value = `<a href="${value}" target="_blank" rel="noopener"
              title="Open this link in a new tab">
            ${value}
          </a>`;
        }

        return `<tr>
          <td><b>${title}</b></td>
          <td>${value}</td>
        </tr>`;
      })
      .join('')}
    </table>`;
}
