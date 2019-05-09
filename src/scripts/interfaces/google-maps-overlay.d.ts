interface IGoogleMapsOverlayParams {
  layers: any[];
}

declare module '@deck.gl/google-maps' {
  export class GoogleMapsOverlay {
    _deck: {
      layerManager: any;
      pickObject: (params: any) => any;
    };
    constructor(params: IGoogleMapsOverlayParams);
    setMap(map: google.maps.Map): void;
  }
}
