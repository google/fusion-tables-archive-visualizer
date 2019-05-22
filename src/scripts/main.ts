import {GeoJsonLayer, IconLayer} from '@deck.gl/layers';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import initMap from './init-google-maps';
import initAuth from './init-google-auth';
import getParamsFromHash from './get-params-from-hash';
import fetchData from './fetch-data';
import deckGlGeojsonLayer from './deck-gl-geojson-layer';
import deckGlIconLayer from './deck-gl-icon-layer';
import initInfowindow from './init-infowindow';
import {IStyle} from './interfaces/style';

(async () => {
  const map = await initMap();
  const $signin = document.getElementById('signin');

  if (!$signin) {
    return;
  }

  await initAuth();
  $signin.style.display = 'none';

  const params = getParamsFromHash();

  if (!params.file) {
    return;
  }

  const data = await fetchData(params.file);

  if (!data) {
    return;
  }

  const geojsonLayer: GeoJsonLayer = deckGlGeojsonLayer(
    data,
    params.style as IStyle
  );
  const iconLayer: IconLayer = deckGlIconLayer(data, params.style as IStyle);
  const overlay = new GoogleMapsOverlay({
    layers: [geojsonLayer, iconLayer]
  });

  overlay.setMap(map);
  initInfowindow(map, overlay);
})();
