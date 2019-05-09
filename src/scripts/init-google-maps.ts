import {GOOGLE_MAPS_URL, INITIAL_VIEW_STATE} from './config';
import basemapStyle from './basemap';

/**
 * Load & Initialize Google Maps API
 */
export default function(): Promise<google.maps.Map> {
  const script = document.createElement('script');
  script.id = 'decoder_script';
  script.type = 'text/javascript';
  script.src = GOOGLE_MAPS_URL;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);

  const mapEl = document.getElementById('map');
  const mapOptions: google.maps.MapOptions = {
    styles: basemapStyle,
    center: {
      lat: INITIAL_VIEW_STATE.latitude,
      lng: INITIAL_VIEW_STATE.longitude
    },
    // Adding 1 to the zoom level get us close to each other
    zoom: INITIAL_VIEW_STATE.zoom + 1,
    tilt: INITIAL_VIEW_STATE.pitch,
    mapTypeControl: false,
    streetViewControl: false
  };

  return new Promise(resolve => {
    script.onload = () => {
      const map = new google.maps.Map(mapEl, mapOptions);
      resolve(map);
    };
  });
}
