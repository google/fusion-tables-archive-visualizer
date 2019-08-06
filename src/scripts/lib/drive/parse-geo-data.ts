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
 * Parse the data for geometries or point data
 */
export default function(data: string[][]): string[][] {
  const columnNames = data[0].map(columnName => columnName.toLowerCase());

  if (columnNames.includes('geometry')) {
    return data;
  }

  const latColumn = getColumnStartingWith(columnNames, 'lat');
  const lngColumn =
    getColumnStartingWith(columnNames, 'lng') ||
    getColumnStartingWith(columnNames, 'lon');

  if (latColumn && lngColumn) {
    const latIndex = columnNames.indexOf(latColumn);
    const lngIndex = columnNames.indexOf(lngColumn);

    return data.map((row, index) => {
      if (index === 0) {
        row.push('geometry');
      } else {
        const point = getGeoJsonPoint(row[lngIndex], row[latIndex]);
        row.push(point);
      }
      return row;
    });
  }

  const anyGeometryColumn = columnNames.find(
    column => column.indexOf('geometry') !== -1
  );

  if (anyGeometryColumn) {
    const anyGeometryIndex = columnNames.indexOf(anyGeometryColumn);

    data[0][anyGeometryIndex] = 'geometry';
    return data;
  }

  const firstRow = data[1];
  const geometryContentIndex =
    firstRow &&
    firstRow.findIndex(cell => {
      try {
        const geoJson = JSON.parse(cell);
        return geoJson && geoJson.type && geoJson.type === 'Feature';
      } catch (error) {
        return false;
      }
    });

  if (geometryContentIndex) {
    data[0][geometryContentIndex] = 'geometry';
    return data;
  }

  return data;
}

/**
 * Get the column name of the column starting with the passed string
 */
function getColumnStartingWith(
  columnNames: string[],
  start: string
): string | undefined {
  return columnNames.find(
    columnName => columnName.toLowerCase().indexOf(start) === 0
  );
}

/**
 * Get a point as a GeoJSON point
 */
function getGeoJsonPoint(lng: string, lat: string): string {
  return `
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [${lng}, ${lat}]
      }
    }
  `;
}
