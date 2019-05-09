import * as React from "react";

import { MapContext } from "../map/MapContext";

export interface IFightLayerProps {
  id: string;
  source: string;
  onClick?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => void;
  onMouseEnter?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => void;
  onMouseLeave?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => void;
}

const FlightLayer: React.FC<IFightLayerProps> = ({
  id,
  source,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    map.addLayer({
      id,
      source,
      type: "symbol",
      layout: {
        "icon-image": "airport-15",
        "icon-allow-overlap": true,
        "icon-rotate": ["get", "direction"]
      }
    });

    if (onMouseEnter) {
      map.on("mouseenter", id, e => {
        map.getCanvas().style.cursor = "pointer";
        onMouseEnter(e);
      });
    }

    if (onMouseLeave) {
      map.on("mouseleave", id, e => {
        map.getCanvas().style.cursor = "";
        onMouseLeave(e);
      });
    }

    if (onClick) {
      map.on("click", id, e => {
        onClick(e);
      });
    }
  }, []);

  return null;
};

export default FlightLayer;
