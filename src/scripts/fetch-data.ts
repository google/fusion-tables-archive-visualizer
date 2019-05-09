import {parse} from 'papaparse';
import parseGeoData from './parse-geo-data';

/**
 * Fetch a CSV and return it as JSON
 */
export default async function(fileId: string): Promise<string[][] | null> {
  try {
    const rawData = await fetchData(fileId);
    const parsed = parse(rawData.body);
    const analyzedData = parseGeoData(parsed.data);
    return analyzedData;
  } catch (error) {
    // tslint:disable-next-line no-console
    console.error('ERROR fetching data!', error);
    return null;
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
