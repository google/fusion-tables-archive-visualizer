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

import {IconLayer} from '@deck.gl/layers';
import {ICON_LAYER_ID} from '../../config/config';
import {IStyle} from '../../interfaces/style';
import {IIcon} from '../../interfaces/icon';
import createIconsFromData from './create-icons-from-data';
import {getIconName, getIconByName, getIconSizeByName} from './icon-helper';

/**
 * Create a GeoJSON layer from the data
 * Converts the WKT data to GeoJSON
 */
export default function(data: string[][], style?: IStyle): IconLayer {
  return new IconLayer({
    id: ICON_LAYER_ID,
    data: createIconsFromData(data) as any,
    getIcon: (d: IIcon) => getIconByName(getIconName(d, style)),
    getSize: (d: IIcon) => getIconSizeByName(getIconName(d, style)),
    pickable: true,
    wrapLongitude: true
  });
}
