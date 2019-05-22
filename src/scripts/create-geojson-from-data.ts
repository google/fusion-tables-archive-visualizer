/**
 * Create a GeoJSON FeatureCollection from the source data
 */
export default function createGeojsonFromData(
  data: string[][]
): GeoJSON.FeatureCollection<GeoJSON.GeometryObject> | null {
  const featureCollection: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  const columns = data[0];
  const geometryIndex = columns.indexOf('geometry');

  if (!geometryIndex) {
    return null;
  }

  data.forEach((row, index) => {
    if (index === 0) {
      return;
    }

    const geoJsonFeature = getGeoJsonWithProperties(
      row[geometryIndex],
      columns,
      row
    );

    if (geoJsonFeature && geoJsonFeature.geometry.type !== 'Point') {
      featureCollection.features.push(geoJsonFeature);
    }
  });

  return featureCollection;
}

/**
 * Convert the WKT to GeoJSON.
 * As there might be the feature wrapper missing, add it.
 */
function getGeoJsonWithProperties(
  geoJsonString: string,
  columns: string[],
  row: string[]
): GeoJSON.Feature<any> | null {
  if (!geoJsonString) {
    return null;
  }

  const geoJson = JSON.parse(geoJsonString) as GeoJSON.Feature<any>;
  geoJson.properties = columns.reduce(
    (all: {[name: string]: any}, current: string, currentIndex: number) => {
      if (current === 'geometry') {
        return all;
      }

      all[current] = row[currentIndex] || '';

      return all;
    },
    {}
  );

  return geoJson;
}
