import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import markerIcon from "../images/markerIcon.png";

// shape of the props
// {
//  positionInfos: [{address: "some address"}]
// }

export default function LeafletControlGeocoder(props) {
  const map = useMap();
  const { positionInfos } = props;

  useEffect(() => {
    // creaet Geocoder nominatim
    var geocoder = L.Control.Geocoder.nominatim();
    // for every positionInfo
    // get the geocordinates of the address in the positionInfo
    // use the latitude and longitude to create a marker
    // and add it the map
    positionInfos.map((positionInfo) => {
      const address = positionInfo.address;
      if (address) {
        geocoder.geocode(address, (resultArray) => {
          if (resultArray.length > 0) {
            const result = resultArray[0];
            const latlng = result.center;
            L.marker(latlng, { markerIcon }).addTo(map).bindPopup(result.name);
            map.fitBounds(result.bbox);
          }
        });
      }
    });
  }, [positionInfos]);

  return null;
}
