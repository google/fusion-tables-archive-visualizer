/**
 * Configuration for the visualizer
 */
export const GOOGLE_MAPS_URL =
  'https://maps.googleapis.com/maps/api/js' +
  `?key=AIzaSyB19LiAsfzQxXMNcYg7ywMab90mgcuJJeM&libraries=visualization&v=3.34`;

export const TILE_SIZE = 256;

export const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  zoom: 2,
  pitch: 0
};

export const LAYER_ID = 'geojson-layer';
