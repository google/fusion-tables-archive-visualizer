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

const $isLargeWarning = document.querySelector(
  '.is-large-warning'
) as HTMLDivElement;
const $spinner = document.querySelector('.spinner') as SVGElement;

/**
 * Show the warning
 */
export function showIsLargeWarning() {
  $isLargeWarning.classList.remove('is-large-warning--hidden');
}

/**
 * Finish loading
 */
export function finishLoading() {
  $spinner.classList.add('spinner--hidden');
  $isLargeWarning.classList.add('is-large-warning--hidden');
}
