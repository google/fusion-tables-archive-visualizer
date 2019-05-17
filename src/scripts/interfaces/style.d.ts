/**
 * A style of a visualization and it’s parts
 */
type IMarkerIcon = {
  fillColor: string;
  size: 'large' | 'small';
};

export type IMarkerStyle = {
  icon?: IMarkerIcon;
  columnName?: string;
  buckets?: {
    min: number;
    max: number;
    icon: IMarkerIcon;
  }[];
};

export type IColorGradient = {
  min: number;
  max: number;
  colors: string[];
};

export type IColorStyle = {
  color?: string;
  columnName?: string;
  buckets?: {
    min: number;
    max: number;
    color: string;
  }[];
  gradient?: IColorGradient;
};

export type IWeightStyle = {
  weight?: number;
  columnName?: string;
  buckets?: {
    min: number;
    max: number;
    weight: number;
  }[];
};

export type IPolylineStyle = {
  strokeColor?: IColorStyle;
  strokeWeight?: IWeightStyle;
};

export type IPolygonStyle = {
  fill?: IColorStyle;
  strokeColor?: IColorStyle;
  strokeWeight?: IWeightStyle;
};

export type IStyle = {
  marker?: IMarkerStyle;
  polyline?: IPolylineStyle;
  polygon?: IPolygonStyle;
};
