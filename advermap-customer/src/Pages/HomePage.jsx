import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import AutocompleteComponent from "../component/AutocompleteComponent";
import { useSelector } from "react-redux";
import { selectGeocoding } from "../redux/reducers";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import AdvertisementComponent from "../component/AdvertisementComponent";
import SomeDetailComponent from "../component/SomeDetailComponent";
import ToolComponent from "../component/ToolComponent";

export default function HomePage() {
  const spaces = [
    { lat: 10.79375530641856, lng: 106.72228643720966 },
    { lat: 10.7771, lng: 106.7012 },
    { lat: 10.7768, lng: 106.7005 },
    { lat: 10.777, lng: 106.7008 },
    { lat: 10.7766, lng: 106.7015 },
    { lat: 10.7767, lng: 106.701 },
    { lat: 10.7772, lng: 106.7011 },
    { lat: 10.7768, lng: 106.7007 },
    { lat: 10.7771, lng: 106.7006 },
    { lat: 10.7773, lng: 106.7009 },
    { lat: 10.7769, lng: 106.7013 },
  ];
  const defaultProps = {
    center: {
      lat: 10.79375530641856,
      lng: 106.72228643720966,
    },
    zoom: 13,
  };

  const customIcon = new L.Icon({
    iconUrl: require("../images/marker.png"),
    iconSize: [38, 38],
  });

  const mapRef = useRef(null);
  const geocoding = useSelector(selectGeocoding);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!geocoding || !mapRef.current) {
      return;
    }

    // Fit the map to the geocoding result
    mapRef.current.setView([geocoding.lat, geocoding.lng], defaultProps.zoom, {
      animate: true,
      duration: 1,
    });
  }, [geocoding]);

  useEffect(() => {
    if (show) {
      console.log(show);
    }
  }, [show]);

  return (
    <div className="h-full w-full flex flex-row">
      {" "}
      <div className={`relative ${show ? "h-full w-[80%]" : "h-full w-full"}`}>
        {/* AutocompleteComponent */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-[90%] h-fit">
          <AutocompleteComponent />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90%] h-fit">
          <ToolComponent className="w-full"></ToolComponent>\
        </div>

        {/* MapContainer */}
        <MapContainer
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          style={{ height: "100vh", width: "100%" }}
          className="relative z-0"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {spaces.map((space, index) => (
              <Marker
                key={index}
                position={[space.lat, space.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: (e) => {
                    setShow(true);
                  },
                }}
              >
                <Popup>
                  <SomeDetailComponent
                    format={"Cổ động chính trị"}
                    type={"Đất công viên"}
                    address={
                      "720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam"
                    }
                    is_planned={true}
                  ></SomeDetailComponent>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      {show && (
        <AdvertisementComponent
          className=" m-2 h-fit w-[20%] p-2 rounded-xl border-gray-200"
          format={"Trụ, cụm pano"}
          width={"2.5m"}
          height={"10m"}
          type={"Đất công"}
          formatspace={"Cổ động chính trị"}
          address={"Đồng khởi - Nguyễn Du"}
        ></AdvertisementComponent>
      )}
    </div>
  );
}
