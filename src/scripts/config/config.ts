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
 * Configuration for the visualizer
 */
export const getGoogleMapsApiUrl = (apiKey: string) =>
  'https://maps.googleapis.com/maps/api/js' +
  `?key=${apiKey}&libraries=visualization`;

export const TILE_SIZE = 256;

export const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  zoom: 2,
  pitch: 0
};

export const GEOJSON_LAYER_ID = 'geojson-layer';
export const ICON_LAYER_ID = 'icon-layer';
