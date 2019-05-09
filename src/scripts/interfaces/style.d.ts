/**
 * A style of a visualization
 */
export type IStyle = {
  marker?: {
    fillColor: string;
    size: string;
  };
  polyline?: {
    strokeColor?: string;
    strokeWeight?: number;
  };
  polygon?: {
    fillColor?: string;
    strokeColor?: string;
    strokeWeight?: number;
  };
};
