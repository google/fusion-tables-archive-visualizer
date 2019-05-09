const POINT = 'Point';
const MULTI_POINT = 'MultiPoint';
const LINE_STRING = 'LineString';
const MULTI_LINE_STRING = 'MultiLineString';
const POLYGON = 'Polygon';
const MULTI_POLYGON = 'MultiPolygon';
const GEOMETRY_COLLECTION = 'GeometryCollection';
const FEATURE = 'Feature';
const FEATURE_COLLECTION = 'FeatureCollection';

/**
 * Get the type for a GeoJSON object
 */
export default function getGeojsonType(
  geojson: GeoJSON.GeoJSON
): 'marker' | 'polyline' | 'polygon' {
  const {type} = geojson;

  switch (type) {
    case POINT:
    case MULTI_POINT:
      return 'marker';

    case LINE_STRING:
    case MULTI_LINE_STRING:
      return 'polyline';

    case POLYGON:
    case MULTI_POLYGON:
      return 'polygon';

    case FEATURE:
      return getGeojsonType((geojson as GeoJSON.Feature).geometry);

    case FEATURE_COLLECTION:
      return getGeojsonType(
        (geojson as GeoJSON.FeatureCollection).features[0].geometry
      );

    case GEOMETRY_COLLECTION:
      return getGeojsonType(
        (geojson as GeoJSON.GeometryCollection).geometries[0]
      );
  }
}
