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
 * Returns the name of the geometry column
 */
export default function(data: string[][]): string {
  const columnNames = data[0].map(columnName => columnName.toLowerCase());

  const anyGeometryColumn = columnNames.find(columnName =>
    columnName.includes('geometry')
  );

  if (anyGeometryColumn) {
    return anyGeometryColumn;
  }

  const firstRow = data[1];
  if (firstRow) {
    const geometryIndex = firstRow.findIndex(cell => {
      try {
        const geoJson = JSON.parse(cell);
        return geoJson && geoJson.type && geoJson.type === 'Feature';
      } catch (error) {
        return false;
      }
    });

    return columnNames[geometryIndex];
  }

  return 'geometry';
}
