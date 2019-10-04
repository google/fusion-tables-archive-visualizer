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

import getGeometryColumnName from '../get-geometry-column-name';

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

  const geometryColumnName = getGeometryColumnName(data);
  const geometryIndex = columns.indexOf(geometryColumnName);

  if (geometryIndex === -1) {
    return null;
  }

  data.forEach((row, index) => {
    if (index === 0) {
      return;
    }

    const geoJsonFeature = getGeoJsonWithProperties(
      row[geometryIndex],
      columns,
      row,
      geometryColumnName
    );

    if (
      geoJsonFeature &&
      geoJsonFeature.geometry.type !== 'Point' &&
      geoJsonFeature.geometry.coordinates &&
      geoJsonFeature.geometry.coordinates.length
    ) {
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
  row: string[],
  geometryColumnName: string
): GeoJSON.Feature<any> | null {
  if (!geoJsonString) {
    return null;
  }

  try {
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
  } catch (error) {
    return null;
  }
}
