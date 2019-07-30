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

import {parse} from 'papaparse';
import parseGeoData from './parse-geo-data';

/**
 * Fetch a CSV and return it as JSON
 */
export default async function(fileId: string): Promise<string[][]> {
  try {
    const rawData = await fetchData(fileId);
    const parsed = parse(rawData.body);
    const analyzedData = parseGeoData(parsed.data);
    return analyzedData;
  } catch (error) {
    throw error;
  }
}

async function fetchData(
  fileId: string
): Promise<gapi.client.Response<gapi.client.drive.File | void>> {
  try {
    return await fetchSpreadsheet(fileId);
  } catch (error) {
    return await fetchCsv(fileId);
  }
}

/**
 * Fetch a Spreadsheet and return that content
 */
async function fetchSpreadsheet(
  fileId: string
): Promise<gapi.client.Response<void>> {
  const response = await gapi.client.drive.files.export({
    fileId,
    alt: 'media',
    mimeType: 'text/csv'
  });

  return response;
}

/**
 * Fetch a CSV and return that content
 */
async function fetchCsv(
  fileId: string
): Promise<gapi.client.Response<gapi.client.drive.File>> {
  const response = await gapi.client.drive.files.get({
    fileId,
    alt: 'media'
  });

  return response;
}
