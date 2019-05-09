const latLngPairs: Array<[string, string]> = [
  ['Latitude', 'Longitude'],
  ['latitude', 'longitude'],
  ['Lat', 'Lng'],
  ['Lat', 'Lon'],
  ['Lat', 'Long'],
  ['lat', 'lng'],
  ['lat', 'lon'],
  ['lat', 'long']
];

/**
 * Parse the data for geometries or point data
 */
export default function(data: string[][]): string[][] {
  const columnNames = data[0];

  if (columnNames.includes('geometry')) {
    return data;
  }

  const latLngPair = latLngPairs.find(
    pair => columnNames.includes(pair[0]) && columnNames.includes(pair[1])
  );

  if (latLngPair) {
    const latIndex = columnNames.indexOf(latLngPair[0]);
    const lngIndex = columnNames.indexOf(latLngPair[1]);

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

  return data;
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
