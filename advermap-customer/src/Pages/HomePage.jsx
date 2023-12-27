import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import AutocompleteComponent from "../component/AutocompleteComponent";
import { useSelector } from "react-redux";
import { selectGeocoding } from "../redux/navSlice";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import AdvertisementComponent from "../component/AdvertisementComponent";
import SomeDetailComponent from "../component/SomeDetailComponent";
import ToolComponent from "../component/ToolComponent";
import { SpaceService } from "../services/SpaceServices";
import { SurfaceServices } from "../services/SurfaceServices";
import Text from "./../component/Text";
import FormReport from "../component/FormReport";

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
export default function HomePage() {
  const [spaces, setSpaces] = useState([]);
  const [surfaces, setSurfaces] = useState([]);

  const mapRef = useRef(null);
  const geocoding = useSelector(selectGeocoding);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);

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

  const handleClickMarker = (space) => {
    setShow(true);
    setSelectedSpace(space);
  };

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await SpaceService.getAll();
        setSpaces((prev) => data);
        console.log("fetch Spaces:", data);
      } catch (error) {
        console.log(error);
      }
    };
    setShow(false);
    fetchSpace();
  }, []);

  useEffect(() => {
    const fetchSurfaces = async (id) => {
      try {
        const data = await SurfaceServices.getBySpaceId(id);
        console.log(`fetch Surfaces of Space ${id}`, data);
        setSurfaces((prev) => data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedSpace) {
      fetchSurfaces(selectedSpace.id);
    }
  }, [selectedSpace]);

  return (
    <>
      <div className="h-full w-full flex flex-row">
        <div
          className={`relative ${show ? "h-full w-[80%]" : "h-full w-full"}`}
        >
          {/* AutocompleteComponent */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-[90%] h-fit">
            <AutocompleteComponent />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90%] h-fit">
            <ToolComponent className="w-full" />
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
            {spaces.length > 0 ? (
              <MarkerClusterGroup>
                {spaces.map((space, index) => (
                  <Marker
                    key={index}
                    position={[space.latitude, space.longitude]}
                    icon={customIcon}
                    eventHandlers={{
                      click: (e) => handleClickMarker(space),
                    }}
                  >
                    <Popup>
                      <SomeDetailComponent
                        format={space.format}
                        type={space.type}
                        address={space.address}
                        planned={space.planned}
                      />
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            ) : (
              <p>Loading...</p>
            )}
          </MapContainer>
        </div>
        {show && (
          <div className="flex flex-col h-full w-[20%] overflow-auto">
            {surfaces.length > 0 ? (
              surfaces.map((surface) => (
                <AdvertisementComponent
                  className=" m-2 p-2 rounded-xl border-gray-200"
                  format={surface.format}
                  width={surface.width}
                  height={surface.height}
                  type={selectedSpace.type}
                  formatspace={selectedSpace.format}
                  address={selectedSpace.address}
                  surfaceid={surface.id}
                  selectedSpace={selectedSpace}
                />
              ))
            ) : (
              <Text className={"font-bold text-center m-auto"}>
                Không có biển quảng cáo trên địa điểm này
              </Text>
            )}
          </div>
        )}
      </div>
    </>
  );
}
