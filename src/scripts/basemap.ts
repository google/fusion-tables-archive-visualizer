/**
 * A clean Google Maps Style
 */
export default [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      },
      {
        lightness: '42'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        hue: '#0066ff'
      },
      {
        saturation: 74
      },
      {
        lightness: 100
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#5f94ff'
      },
      {
        lightness: 26
      },
      {
        gamma: 5.86
      }
    ]
  }
] as google.maps.MapTypeStyle[];
