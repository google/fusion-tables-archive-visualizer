import {IIcon} from './interfaces/icon';

/**
 * Create an array of marker icons from the source data
 */
export default function createIconsFromData(data: string[][]): IIcon[] | null {
  const icons: IIcon[] = [];
  const columns = data[0];
  const geometryIndex = columns.indexOf('geometry');

  if (geometryIndex === -1) {
    return null;
  }

  data.forEach((row, index) => {
    if (index === 0) {
      return;
    }

    const icon = getIconWithProperties(row[geometryIndex], columns, row);

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
  row: string[]
): IIcon | null {
  if (!geoJsonString) {
    return null;
  }

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
}
