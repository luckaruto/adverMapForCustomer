import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const customIconMarker = new L.Icon({
  iconUrl: require("../images/markerIcon.png"),
  iconSize: [38, 38],
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [marker, setMarker] = useState(null);

  const reverseGeocode = (latlng) => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse(
      latlng,
      map.options.crs.scale(map.getZoom()),
      (results) => {
        const r = results[0];
        if (r) {
          setAddress(r.name || "");
        }
      }
    );
  };

  const map = useMapEvents({
    click: (e) => {
      const latlng = e.latlng;

      reverseGeocode(latlng);

      if (marker) {
        marker.setLatLng(latlng);
        marker.getPopup().setContent(address);
        marker.openPopup();
      } else {
        const newMarker = L.marker(latlng, { icon: customIconMarker })
          .bindPopup(address)
          .addTo(map);
        setMarker(newMarker);
      }
    },
    locationfound: (e) => {
      const latlng = e.latlng;
      setPosition(latlng);
      reverseGeocode(latlng);
      map.flyTo(latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (position) {
      reverseGeocode(position);
    }
  }, [position]);

  return position === null ? null : (
    <Marker position={position} icon={customIconMarker}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

export default LocationMarker;
