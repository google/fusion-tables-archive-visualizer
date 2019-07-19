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

import {IStyle} from '../../interfaces/style';
import {IIcon} from '../../interfaces/icon';

const getGeovizUrl = (filename: string): string =>
  `https://fusiontables-archive.withgoogle.com/geoviz/icons/${filename}.png`;
const getShapesUrl = (filename: string): string =>
  `https://maps.gstatic.com/mapfiles/kml/shapes/${filename}.png`;
const getPaddleUrl = (filename: string): string =>
  `https://maps.gstatic.com/mapfiles/kml/paddle/${filename}.png`;

const DEFAULT_ICON = 'small_red';
export const SMALL_ICON_SIZE = 12;
export const LARGE_ICON_SIZE = 48;

const ICON_MAPPING: {[key: string]: string} = {
  small_red: getGeovizUrl('08-measle-red'),
  small_yellow: getGeovizUrl('02-measle-yellow'),
  small_green: getGeovizUrl('03-measle-green'),
  small_blue: getGeovizUrl('10-measle-blue'),
  small_purple: getGeovizUrl('06-measle-purple'),

  large_red: getPaddleUrl('red-blank'),
  large_yellow: getPaddleUrl('ylw-blank'),
  large_green: getPaddleUrl('grn-blank'),
  large_blue: getPaddleUrl('blu-blank'),
  large_purple: getPaddleUrl('purple-blank'),

  measle_brown: getGeovizUrl('04-measle-brown'),
  measle_grey: getGeovizUrl('05-measle-grey'),
  measle_white: getGeovizUrl('11-measle-white'),
  measle_turquoise: getGeovizUrl('07-measle-turquoise'),

  a: getPaddleUrl('A'),
  b: getPaddleUrl('B'),
  c: getPaddleUrl('C'),
  d: getPaddleUrl('D'),
  e: getPaddleUrl('E'),
  f: getPaddleUrl('F'),
  g: getPaddleUrl('G'),
  h: getPaddleUrl('H'),
  i: getPaddleUrl('I'),
  j: getPaddleUrl('J'),
  k: getPaddleUrl('K'),
  l: getPaddleUrl('L'),
  m: getPaddleUrl('M'),
  n: getPaddleUrl('N'),
  o: getPaddleUrl('O'),
  p: getPaddleUrl('P'),
  q: getPaddleUrl('Q'),
  r: getPaddleUrl('R'),
  s: getPaddleUrl('S'),
  t: getPaddleUrl('T'),
  u: getPaddleUrl('U'),
  v: getPaddleUrl('V'),
  w: getPaddleUrl('W'),
  x: getPaddleUrl('X'),
  y: getPaddleUrl('Y'),
  z: getPaddleUrl('Z'),
  go: getPaddleUrl('go'),
  stop: getPaddleUrl('stop'),
  pause: getPaddleUrl('pause'),
  a_blue: getPaddleUrl('A_blue'),
  b_blue: getPaddleUrl('B_blue'),
  c_blue: getPaddleUrl('C_blue'),
  d_blue: getPaddleUrl('D_blue'),
  e_blue: getPaddleUrl('E_blue'),
  f_blue: getPaddleUrl('F_blue'),
  g_blue: getPaddleUrl('G_blue'),
  h_blue: getPaddleUrl('H_blue'),
  i_blue: getPaddleUrl('I_blue'),
  j_blue: getPaddleUrl('J_blue'),
  k_blue: getPaddleUrl('K_blue'),
  l_blue: getPaddleUrl('L_blue'),
  m_blue: getPaddleUrl('M_blue'),
  n_blue: getPaddleUrl('N_blue'),
  o_blue: getPaddleUrl('O_blue'),
  p_blue: getPaddleUrl('P_blue'),
  q_blue: getPaddleUrl('Q_blue'),
  r_blue: getPaddleUrl('R_blue'),
  s_blue: getPaddleUrl('S_blue'),
  t_blue: getPaddleUrl('T_blue'),
  u_blue: getPaddleUrl('U_blue'),
  v_blue: getPaddleUrl('V_blue'),
  w_blue: getPaddleUrl('W_blue'),
  x_blue: getPaddleUrl('X_blue'),
  y_blue: getPaddleUrl('Y_blue'),
  z_blue: getPaddleUrl('Z_blue'),
  '1_blue': getPaddleUrl('1_blue'),
  '2_blue': getPaddleUrl('2_blue'),
  '3_blue': getPaddleUrl('3_blue'),
  '4_blue': getPaddleUrl('4_blue'),
  '5_blue': getPaddleUrl('5_blue'),
  '6_blue': getPaddleUrl('6_blue'),
  '7_blue': getPaddleUrl('7_blue'),
  '8_blue': getPaddleUrl('8_blue'),
  '9_blue': getPaddleUrl('9_blue'),
  '10_blue': getPaddleUrl('10_blue'),
  red_blank: getPaddleUrl('red-blank'),
  ylw_blank: getPaddleUrl('ylw-blank'),
  grn_blank: getPaddleUrl('grn-blank'),
  blu_blank: getPaddleUrl('blu-blank'),
  purple_blank: getPaddleUrl('purple-blank'),
  ltblu_blank: getPaddleUrl('ltblu-blank'),
  pink_blank: getPaddleUrl('pink-blank'),
  wht_blank: getPaddleUrl('wht-blank'),
  orange_blank: getPaddleUrl('orange-blank'),
  red_circle: getPaddleUrl('red-circle'),
  ylw_circle: getPaddleUrl('ylw-circle'),
  grn_circle: getPaddleUrl('grn-circle'),
  blu_circle: getPaddleUrl('blu-circle'),
  purple_circle: getPaddleUrl('purple-circle'),
  ltblu_circle: getPaddleUrl('ltblu-circle'),
  pink_circle: getPaddleUrl('pink-circle'),
  wht_circle: getPaddleUrl('wht-circle'),
  orange_circle: getPaddleUrl('orange-circle'),
  red_stars: getPaddleUrl('red-stars'),
  ylw_stars: getPaddleUrl('ylw-stars'),
  grn_stars: getPaddleUrl('grn-stars'),
  blu_stars: getPaddleUrl('blu-stars'),
  purple_stars: getPaddleUrl('purple-stars'),
  ltblu_stars: getPaddleUrl('ltblu-stars'),
  pink_stars: getPaddleUrl('pink-stars'),
  wht_stars: getPaddleUrl('wht-stars'),
  orange_stars: getPaddleUrl('orange-stars'),
  red_square: getPaddleUrl('red-square'),
  ylw_square: getPaddleUrl('ylw-square'),
  grn_square: getPaddleUrl('grn-square'),
  blu_square: getPaddleUrl('blu-square'),
  purple_square: getPaddleUrl('purple-square'),
  ltblu_square: getPaddleUrl('ltblu-square'),
  pink_square: getPaddleUrl('pink-square'),
  wht_square: getPaddleUrl('wht-square'),
  orange_square: getPaddleUrl('orange-square'),
  red_diamond: getPaddleUrl('red-diamond'),
  ylw_diamond: getPaddleUrl('ylw-diamond'),
  grn_diamond: getPaddleUrl('grn-diamond'),
  blu_diamond: getPaddleUrl('blu-diamond'),
  purple_diamond: getPaddleUrl('purple-diamond'),
  ltblu_diamond: getPaddleUrl('ltblu-diamond'),
  pink_diamond: getPaddleUrl('pink-diamond'),
  wht_diamond: getPaddleUrl('wht-diamond'),
  orange_diamond: getPaddleUrl('orange-diamond'),
  open_diamond: getShapesUrl('open-diamond'),
  info_i: getShapesUrl('info-i'),
  cross_hairs: getShapesUrl('cross-hairs'),
  cross_hairs_highlight: getShapesUrl('cross-hairs_highlight'),
  arrow_reverse: getShapesUrl('arrow_reverse')
};

/**
 * Get the name of an icon from the style
 */
export function getIconName(element: IIcon, style?: IStyle): string {
  if (!style || !style.marker) {
    return DEFAULT_ICON;
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
      (element.properties && element.properties[columnName]) || DEFAULT_ICON
    );
  }

  if (icon) {
    return icon;
  }

  return DEFAULT_ICON;
}

/**
 * Get an icon by name
 */
export function getIconByName(name: string) {
  const isSmall = name.indexOf('small') === 0 || name.indexOf('measle') === 0;
  const url = ICON_MAPPING[name] || getShapesUrl(name);

  return {
    url,
    width: isSmall ? 9 : 64,
    height: isSmall ? 9 : 64,
    anchorX: isSmall ? 4.5 : 32,
    anchorY: isSmall ? 4.5 : 64
  };
}

/**
 * Get an icon size by name
 */
export function getIconSizeByName(name: string): number {
  const isSmall = name.indexOf('small') === 0 || name.indexOf('measle') === 0;
  return isSmall ? SMALL_ICON_SIZE : LARGE_ICON_SIZE;
}
