import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {LAYER_ID} from './config';
import isImageUrl from './is-image-url';

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
      layerIds: [LAYER_ID]
    });
    document.body.classList.toggle('cursor-pointer', picked);
  });

  map.addListener('click', event => {
    const {latLng, pixel} = event;
    const {x, y} = pixel;
    const picked = overlay._deck.pickObject({
      x,
      y,
      radius: 4,
      layerIds: [LAYER_ID]
    });

    if (picked) {
      openInfowindow(infowindow, map, picked.object, latLng);
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
  position: google.maps.LatLng
) {
  if (!feature || !feature.properties || !map || !position) {
    return;
  }

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

        if (isImageUrl(value)) {
          value = `<a href="${value}" target="_blank" rel="noopener"
              title="Open full image in a new tab">
            <img src="${value}" alt="" height="70" />
          </a>`;
        }

        return `<tr>
          <td><b>${key}</b></td>
          <td>${value}</td>
        </tr>`;
      })
      .join('')}
    </table>`;
}
