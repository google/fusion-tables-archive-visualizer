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

import {IStyle} from './interfaces/style';
import {IIcon} from './interfaces/icon';

const smallBasePath =
  'https://storage.googleapis.com/' + 'fusion-tables-export.appspot.com/icons/';
const largeBasePath = 'https://maps.gstatic.com/mapfiles/kml/paddle/';

export const SMALL_ICON_SIZE = 12;
export const LARGE_ICON_SIZE = 48;
const ICON_MAPPING: {[key: string]: string} = {
  small_red: `${smallBasePath}08-measle-red.png`,
  small_yellow: `${smallBasePath}02-measle-yellow.png`,
  small_green: `${smallBasePath}03-measle-green.png`,
  small_blue: `${smallBasePath}10-measle-blue.png`,
  small_purple: `${smallBasePath}06-measle-purple.png`,
  large_red: `${largeBasePath}red-blank.png`,
  large_yellow: `${largeBasePath}ylw-blank.png`,
  large_green: `${largeBasePath}grn-blank.png`,
  large_blue: `${largeBasePath}blu-blank.png`,
  large_purple: `${largeBasePath}purple-blank.png`
};

/**
 * Get the name of an icon from the style
 */
export function getIconName(element: IIcon, style?: IStyle): string {
  if (!style || !style.marker) {
    return 'small_red';
  }

  const {icon, columnName, buckets} = style.marker;

  if (columnName && buckets && buckets.length > 0) {
    const value = (element.properties && element.properties[columnName]) || 0;
    const bucket =
      buckets.find(
        possibleBucket =>
          value >= possibleBucket.min && value <= possibleBucket.max
      ) || buckets[0];

    return bucket.icon;
  }

  if (columnName) {
    return (
      (element.properties && element.properties[columnName]) || 'small_red'
    );
  }

  if (icon) {
    return icon;
  }

  return 'small_red';
}

/**
 * Get an icon by name
 */
export function getIconByName(name: string) {
  const isLarge = name.indexOf('large') === 0 && ICON_MAPPING[name];

  return {
    url: ICON_MAPPING[name] || ICON_MAPPING.small_red,
    width: isLarge ? 64 : 9,
    height: isLarge ? 64 : 9,
    anchorX: isLarge ? 32 : 4.5,
    anchorY: isLarge ? 64 : 4.5
  };
}

/**
 * Get an icon size by name
 */
export function getIconSizeByName(name: string): number {
  const isLarge = name.indexOf('large') === 0 && ICON_MAPPING[name];
  return isLarge ? LARGE_ICON_SIZE : SMALL_ICON_SIZE;
}
