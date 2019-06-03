import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {GEOJSON_LAYER_ID, ICON_LAYER_ID} from './config';
import isUrl from './is-url';

/**
 * Initialize an infowindow that shows the clicked data
 */
export default function(
  map: google.maps.Map,
  overlay: GoogleMapsOverlay
): void {
  map.addListener('mousemove', event => {
    if (!overlay._deck || !overlay._deck.layerManager) {
      return;
    }

    const {x, y} = event.pixel;
    const picked = overlay._deck.pickObject({
      x,
      y,
      radius: 0,
      layerIds: [GEOJSON_LAYER_ID, ICON_LAYER_ID]
    });
    document.body.classList.toggle('cursor-pointer', picked);
  });

  map.addListener('click', event => {
    let {latLng} = event;
    const {x, y} = event.pixel;
    const picked = overlay._deck.pickObject({
      x,
      y,
      radius: 4,
      layerIds: [GEOJSON_LAYER_ID, ICON_LAYER_ID]
    });
    let isMarkerIcon = false;

    if (picked.layer.id === ICON_LAYER_ID) {
      const [lng, lat] = picked.object.position;
      latLng = new google.maps.LatLng(lat, lng);
      isMarkerIcon = true;
    }

    if (picked) {
      openInfowindow(infowindow, map, picked.object, latLng, isMarkerIcon);
    } else {
      infowindow.close();
    }
  });

  const infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 400
  });
}

/**
 * Open the Tooltip for the passed in object
 */
function openInfowindow(
  infowindow: google.maps.InfoWindow,
  map: google.maps.Map,
  feature: GeoJSON.Feature,
  position: google.maps.LatLng,
  isMarkerIcon: boolean
) {
  if (!feature || !feature.properties || !map || !position) {
    return;
  }

  const yOffset = isMarkerIcon ? -34 : 0;

  infowindow.setOptions({
    pixelOffset: new google.maps.Size(0, yOffset);
  });
  infowindow.setContent(createContent(feature.properties));
  infowindow.setPosition(position);
  infowindow.open(map);
}

/**
 * Create the content for the infowindow
 */
function createContent(data: {[key: string]: any}): string {
  return `<table>
    ${Object.keys(data)
      .map(key => {
        let value = data[key];
        const title = key.replace(/::image$/, '');
        const isImageColumn = key.match(/::image$/);
        const isUrlValue = isUrl(value);

        if (isImageColumn && isUrlValue) {
          value = `<a href="${value}" target="_blank" rel="noopener"
              title="Open full image in a new tab">
            <img src="${value}" alt="" height="70" />
          </a>`;
        } else if (isUrlValue) {
          value = `<a href="${value}" target="_blank" rel="noopener"
              title="Open this link in a new tab">
            ${value}
          </a>`;
        }

        return `<tr>
          <td><b>${title}</b></td>
          <td>${value}</td>
        </tr>`;
      })
      .join('')}
    </table>`;
}
