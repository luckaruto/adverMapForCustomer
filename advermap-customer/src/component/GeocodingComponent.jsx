import { Marker, Popup, useMapEvents } from "react-leaflet";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useDispatch } from "react-redux";
import { setAddressGeocoding } from "../redux/navSlice";

const customIconMarker = new L.Icon({
  iconUrl: require("../images/markerIcon.png"),
  iconSize: [38, 38],
});

const LocationMarker = ({ handleClickMarkerGeocoding }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [marker, setMarker] = useState(null);

  const dispatch = useDispatch();

  const reverseGeocode = async (latlng, attempt = 1) => {
    const geocoder = L.Control.Geocoder.nominatim();
    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.reverse(
          latlng,
          map.options.crs.scale(map.getZoom()),
          (results) => {
            resolve(results);
          }
        );
      });

      const r = results[0];
      if (r) {
        setAddress((currentAddress) => {
          if (r.name) {
            // Dispatch the address only if it's valid
            dispatch(setAddressGeocoding(r.name));
            return r.name;
          } else if (attempt <= 5) {
            // Retry with an increasing delay
            setTimeout(
              () => reverseGeocode(latlng, attempt + 1),
              attempt * 1000
            );
            return currentAddress;
          } else {
            // Max attempts reached, give up
            return currentAddress;
          }
        });
      }
    } catch (error) {
      console.error("Error during reverse geocoding:", error);
    }
  };

  const map = useMapEvents({
    click: (e) => {
      const latlng = e.latlng;

      reverseGeocode(latlng);
      handleClickMarkerGeocoding();

      if (marker) {
        marker.setLatLng(latlng);
      } else {
        const newMarker = L.marker(latlng, { icon: customIconMarker }).addTo(
          map
        );
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
      {/* <Popup>{addressGeocoding}</Popup> */}
    </Marker>
  );
};

export default LocationMarker;
