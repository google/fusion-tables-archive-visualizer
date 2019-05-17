import {GeoJsonLayer} from '@deck.gl/layers';
import {LAYER_ID} from './config';
import {IStyle} from './interfaces/style';
import getGeojsonType from './get-geojson-type';
import hexaToRgba from './hexa-to-rgba';
import createGeojsonFromData from './create-geojson-from-data';

/**
 * Create a GeoJSON layer from the data
 * Converts the WKT data to GeoJSON
 */
export default function(data: string[][], style?: IStyle): GeoJsonLayer {
  return new GeoJsonLayer({
    id: LAYER_ID,
    data: createGeojsonFromData(data),
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthUnits: 'pixels',
    lineWidthMinPixels: 1,
    pointRadiusMinPixels: 3,
    getRadius:
      style && style.marker && style.marker.size === 'large' ? 250 : 100,
    getFillColor: (d: GeoJSON.GeoJSON) => {
      const type = getGeojsonType(d);

      if (type === 'marker' && style && style.marker) {
        return hexaToRgba(style.marker.fillColor);
      }

      if (
        type === 'polygon' &&
        style &&
        style.polygon &&
        style.polygon.fillColor
      ) {
        return hexaToRgba(style.polygon.fillColor);
      }

      return [239, 83, 80, 97];
    },
    getLineColor: (d: GeoJSON.GeoJSON) => {
      const type = getGeojsonType(d);

      if (type === 'marker') {
        return [102, 102, 102, 255];
      }

      if (
        type === 'polyline' &&
        style &&
        style.polyline &&
        style.polyline.strokeColor
      ) {
        return hexaToRgba(style.polyline.strokeColor);
      }

      if (
        type === 'polygon' &&
        style &&
        style.polygon &&
        style.polygon.strokeColor
      ) {
        return hexaToRgba(style.polygon.strokeColor);
      }

      return [239, 83, 80, 214];
    },
    getLineWidth: (d: GeoJSON.GeoJSON) => {
      const type = getGeojsonType(d);

      if (type === 'polyline' && style && style.polyline) {
        return style.polyline.strokeWeight;
      }

      if (type === 'polygon' && style && style.polygon) {
        return style.polygon.strokeWeight;
      }

      return 1;
    }
  });
}
