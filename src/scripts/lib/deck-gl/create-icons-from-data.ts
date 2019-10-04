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

import {IIcon} from '../../interfaces/icon';
import getGeometryColumnName from '../get-geometry-column-name';

/**
 * Create an array of marker icons from the source data
 */
export default function createIconsFromData(data: string[][]): IIcon[] | null {
  const icons: IIcon[] = [];
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

    const icon = getIconWithProperties(
      row[geometryIndex],
      columns,
      row,
      geometryColumnName
    );

    if (icon) {
      icons.push(icon);
    }
  });

  return icons;
}

/**
 * Convert a row to an icon
 */
function getIconWithProperties(
  geoJsonString: string,
  columns: string[],
  row: string[],
  geometryColumnName: string
): IIcon | null {
  if (!geoJsonString) {
    return null;
  }

  try {
    const geoJson = JSON.parse(geoJsonString) as GeoJSON.Feature<any>;

    if (geoJson.geometry.type !== 'Point') {
      return null;
    }

    return {
      position: geoJson.geometry.coordinates,
      properties: columns.reduce(
        (all: {[name: string]: any}, current: string, currentIndex: number) => {
          if (current === 'geometry') {
            return all;
          }

          all[current] = row[currentIndex] || '';

          return all;
        },
        {}
      )
    };
  } catch (error) {
    return null;
  }
}
