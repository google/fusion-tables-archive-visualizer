import {GeoJsonLayer} from '@deck.gl/layers';
import {LAYER_ID, MARKER_SIZES} from './config';
import {
  IStyle,
  IColorGradient,
  IColorStyle,
  IWeightStyle
} from './interfaces/style';
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

    getRadius: (d: GeoJSON.Feature) => {
      if (!style || !style.marker) {
        return MARKER_SIZES.small;
      }

      const {icon, columnName, buckets} = style.marker;

      if (columnName && buckets) {
        const bucket = getBucket(buckets, d, columnName);
        return MARKER_SIZES[bucket.icon.size];
      }

      if (columnName) {
        const value: 'large' | 'small' =
          (d.properties && d.properties[columnName]) || 'small';
        return MARKER_SIZES[value];
      }

      if (icon) {
        return MARKER_SIZES[icon.size];
      }

      return MARKER_SIZES.small;
    },

    getFillColor: (d: GeoJSON.Feature) => {
      if (!style) {
        return [239, 83, 80, 97];
      }

      const type = getGeojsonType(d);

      if (type === 'marker' && style.marker) {
        const {icon, columnName, buckets} = style.marker;

        if (columnName && buckets) {
          const bucket = getBucket(buckets, d, columnName);
          return hexaToRgba(bucket.icon.fillColor);
        }

        if (columnName) {
          const value = d.properties && d.properties[columnName];
          if (value) {
            return hexaToRgba(value);
          }
        }

        if (icon) {
          return hexaToRgba(icon.fillColor);
        }
      }

      if (type === 'polygon' && style.polygon && style.polygon.fill) {
        const color = getColor(d, style.polygon.fill);
        if (color) {
          return color;
        }
      }

      return [239, 83, 80, 97];
    },

    getLineColor: (d: GeoJSON.Feature) => {
      if (!style) {
        return [239, 83, 80, 214];
      }

      const type = getGeojsonType(d);

      if (type === 'marker') {
        return [102, 102, 102, 255];
      }

      if (type === 'polyline' && style.polyline && style.polyline.strokeColor) {
        const color = getColor(d, style.polyline.strokeColor);
        if (color) {
          return color;
        }
      }

      if (type === 'polygon' && style.polygon && style.polygon.strokeColor) {
        const color = getColor(d, style.polygon.strokeColor);
        if (color) {
          return color;
        }
      }

      return [239, 83, 80, 214];
    },

    getLineWidth: (d: GeoJSON.Feature) => {
      if (!style) {
        return 1;
      }

      const type = getGeojsonType(d);

      if (
        type === 'polyline' &&
        style.polyline &&
        style.polyline.strokeWeight
      ) {
        const weight = getWeight(d, style.polyline.strokeWeight);
        if (weight) {
          return weight;
        }
      }

      if (type === 'polygon' && style.polygon && style.polygon.strokeWeight) {
        const weight = getWeight(d, style.polygon.strokeWeight);
        if (weight) {
          return weight;
        }
      }

      return 1;
    }
  });
}

/**
 * Get the color for the passed in style definition
 */
function getColor(
  d: GeoJSON.Feature,
  colorStyle: IColorStyle
): number[] | null {
  const {color, columnName, buckets, gradient} = colorStyle;

  if (columnName && buckets) {
    const bucket = getBucket(buckets, d, columnName);
    return hexaToRgba(bucket.color);
  }

  if (columnName && gradient) {
    return getGradientColor(gradient, d, columnName);
  }

  if (columnName) {
    const value = d.properties && d.properties[columnName];
    if (value) {
      return hexaToRgba(value);
    }
  }

  if (color) {
    return hexaToRgba(color);
  }

  return null;
}

/**
 * Get the color for the passed in style definition
 */
function getWeight(
  d: GeoJSON.Feature,
  weightStyle: IWeightStyle
): number | null {
  const {weight, columnName, buckets} = weightStyle;

  if (columnName && buckets) {
    return getBucket(buckets, d, columnName).weight;
  }

  if (columnName) {
    const value = d.properties && d.properties[columnName];
    if (value || Number(value) === 0) {
      return value;
    }
  }

  if (weight || weight === 0) {
    return weight;
  }

  return null;
}

/**
 * Get the matching bucket for the passed in value
 */
function getBucket<
  T extends {
    min: number;
    max: number;
  }
>(buckets: T[], d: GeoJSON.Feature, columnName: string): T {
  const value = (d.properties && d.properties[columnName]) || 0;

  return (
    buckets.find(bucket => value >= bucket.min && value <= bucket.max) ||
    buckets[0]
  );
}

/**
 * Get the gradient color from a column value
 */
function getGradientColor(
  gradient: IColorGradient,
  d: GeoJSON.Feature,
  columnName: string
): number[] | null {
  const {min, max, colors} = gradient;
  const value = (d.properties && d.properties[columnName]) || 0;
  const catchedValue = Math.min(Math.max(value, min), max);
  const percentage = (catchedValue - min) / (max - min);
  const index = Math.min(
    Math.floor(percentage * colors.length),
    colors.length - 1
  );
  return hexaToRgba(gradient.colors[index]);
}
