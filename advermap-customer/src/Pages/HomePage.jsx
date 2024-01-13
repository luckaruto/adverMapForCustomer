import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import LocationMarker from "../component/GeocodingComponent";
import AutocompleteComponent from "../component/AutocompleteComponent";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
  selectGeocoding,
  selectOrigin,
  setOrigin,
  selectReportValue,
  selectAdverValue,
  selectAddressGeocoding,
  setAddressGeocoding,
} from "../redux/navSlice";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import AdvertisementComponent from "../component/AdvertisementComponent";
import SomeDetailComponent from "../component/SomeDetailComponent";
import ToolComponent from "../component/ToolComponent";
import { SpaceService } from "../services/SpaceServices";
import { SurfaceServices } from "../services/SurfaceServices";
import Text from "./../component/Text";

import Loader from "../component/Loader";
import ModelReport from "../component/ModelReport";
import { ReportService } from "../services/ReportServices";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SvgDelete } from "../images/delete.svg";
import { ReactComponent as SvgCompass } from "../images/compass.svg";
import InforAnySpaceComponent from "../component/InforAnySpaceComponent";
import { setSpaceInfo } from "../redux/navSlice";

const defaultProps = {
  center: {
    lat: 10.79375530641856,
    lng: 200.72228643720966,
  },
  zoom: 13,
};

const customIconAdRed = new L.Icon({
  iconUrl: require("../images/advertisementRed.png"),
  iconSize: [38, 38],
});

const customIconAdGreen = new L.Icon({
  iconUrl: require("../images/advertisementGreen.png"),
  iconSize: [38, 38],
});

const customIconAdOrange = new L.Icon({
  iconUrl: require("../images/advertisementOrange.png"),
  iconSize: [38, 38],
});

const customIconReportRed = new L.Icon({
  iconUrl: require("../images/reportRed.png"),
  iconSize: [38, 38],
});

const customIconReportGreen = new L.Icon({
  iconUrl: require("../images/reportGreen.png"),
  iconSize: [38, 38],
});

export default function HomePage() {
  const [spaces, setSpaces] = useState([]);
  const [report, setReport] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mapRef = useRef(null);
  const geocoding = useSelector(selectGeocoding);
  const origin = useSelector(selectOrigin);
  const reportValue = useSelector(selectReportValue);
  const AdverValue = useSelector(selectAdverValue);
  const addressGeocoding = useSelector(selectAddressGeocoding);
  const [show, setShow] = useState(false);
  const [showGeocoding, setShowGeocoding] = useState(false);

  const [cookies, setCookie] = useCookies(["user"]);

  const [selectedSpace, setSelectedSpace] = useState(null);

  const HandleFalse = () => {
    setState(false);
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    dispatch(setOrigin({ lat: crd.latitude, lng: crd.longitude }));
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const HandleTrue = (index) => {
    setState(true);
    if (index == 1) {
      dispatch(setSpaceInfo(null));
      dispatch(setAddressGeocoding(null));
    } else if (index == 2) {
      dispatch(setSurfaces(null));
      dispatch(setSpaceInfo(null));
    } else if (index == 3) {
      dispatch(setSpaceInfo(selectedSpace));
      dispatch(setAddressGeocoding(null));
      dispatch(setSurfaces(null));
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);

          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (origin && !geocoding) {
        if (origin !== null) {
          mapRef.current.setView([origin.lat, origin.lng], defaultProps.zoom, {
            animate: true,
            duration: 1,
          });
        } else return;
      } else if (geocoding && origin) {
        mapRef.current.setView([geocoding.lat, geocoding.lng], 300, {
          animate: true,
          duration: 1,
        });
      } else {
        return;
      }
    }, 500);

    // Fit the map to the geocoding result
  }, [geocoding, origin]);

  const onClickToMyLocation = () => {
    if (origin !== null) {
      mapRef.current.setView([origin.lat, origin.lng], defaultProps.zoom, {
        animate: true,
        duration: 1,
      });
    } else return;
  };

  const handleClickMarker = (space) => {
    setShow(true);
    setShowGeocoding(false);

    setSelectedSpace(space);
  };
  const handleClickMarkerGeocoding = () => {
    setShowGeocoding(true);
    setShow(false);
  };

  const handleClickMarkerReport = (report) => {
    navigate(`/detailsReport/${report.id}`, { state: report });
  };

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await SpaceService.getAll();
        setSpaces((prev) => {
          return data;
        });
        console.log("fetch Spaces:", data);

        console.log(spaces);
      } catch (error) {
        console.log(error);
      }
    };
    setShow(false);

    fetchSpace();
  }, []);

  useEffect(() => {
    const existingIdentifier = cookies.user;
    const fetchReport = async () => {
      try {
        const data = await ReportService.getReport(existingIdentifier);

        setReport((prev) => {
          return data;
        });
        console.log("fetch report:", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReport();
  }, []);

  useEffect(() => {
    const fetchSurfaces = async (id) => {
      try {
        const data = await SurfaceServices.getBySpaceId(id);
        console.log(`fetch Surfaces of Space ${id}`, data);
        setSurfaces((prev) => data);
        console.log(spaces);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedSpace) {
      fetchSurfaces(selectedSpace.id);
    }
  }, [selectedSpace]);

  useEffect(() => {
    console.log(addressGeocoding);
  }, [addressGeocoding]);

  if (spaces.length <= 0) return <Loader title="Loading songs..." />;

  return (
    <>
      {state == true && <ModelReport HandleFalse={HandleFalse} />}
      <div className="h-full w-full flex flex-row">
        <div
          className={`relative ${
            show
              ? "h-full w-full"
              : "h-full w-full" || showGeocoding
              ? "h-full w-full"
              : "h-full w-full"
          }`}
        >
          {/* AutocompleteComponent */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-[90%] h-fit">
            <AutocompleteComponent />
          </div>

          <button
            className="absolute top-5 right-6 z-10  "
            onClick={onClickToMyLocation}
          >
            <SvgCompass className="h-10 w-10"></SvgCompass>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90%] h-[9%] md:h-[20%]">
            <ToolComponent className="w-full h-full" />
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

            <LocationMarker
              // addressGeocoding={addressGeocoding}
              handleClickMarkerGeocoding={handleClickMarkerGeocoding}
            />
            {spaces?.length > 0 ? (
              <MarkerClusterGroup>
                {AdverValue &&
                  spaces.map((space, index) => (
                    <Marker
                      key={index}
                      position={[space.latitude, space.longitude]}
                      icon={
                        space.planned
                          ? space.totalSurface > 0
                            ? customIconAdOrange
                            : customIconAdGreen
                          : customIconAdRed
                      }
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
                {reportValue &&
                  report.map((report, index) => (
                    <Marker
                      key={index}
                      position={[report.latitude, report.longitude]}
                      icon={state ? customIconReportGreen : customIconReportRed}
                      eventHandlers={{
                        click: (e) => handleClickMarkerReport(report),
                      }}
                    ></Marker>
                  ))}
              </MarkerClusterGroup>
            ) : (
              <p>Loading...</p>
            )}
          </MapContainer>
        </div>
        {show && (
          <div className="relative flex flex-col h-full w-[20%] overflow-auto">
            <button
              className="flex items-end justify-end"
              onClick={() => setShow(false)}
            >
              <SvgDelete className="h-5 w-5"></SvgDelete>
            </button>
            {surfaces?.length > 0 ? (
              surfaces.map((surface) => (
                <AdvertisementComponent
                  key={surface.id} // Add a unique key here
                  className=" m-2 p-2 rounded-xl border-gray-200"
                  format={surface.format}
                  width={surface.width}
                  height={surface.height}
                  type={selectedSpace.type}
                  formatspace={selectedSpace.format}
                  address={selectedSpace.address}
                  surfaceid={surface.id}
                  selectedSpace={selectedSpace}
                  HandleTrue={() => HandleTrue(1)}
                />
              ))
            ) : (
              <Text className={"font-bold text-center m-auto"}>
                Không có biển quảng cáo trên địa điểm này
              </Text>
            )}
            <InforAnySpaceComponent
              className=""
              address={selectedSpace?.address}
              HandleTrue={() => HandleTrue(3)}
            />
          </div>
        )}
        {showGeocoding && (
          <div className="relative flex flex-col h-full w-[20%] overflow-auto">
            <button
              className="flex items-end justify-end"
              onClick={() => setShowGeocoding(false)}
            >
              <SvgDelete className="h-5 w-5"></SvgDelete>
            </button>

            <Text className={"font-bold text-center m-auto"}>
              Không có biển quảng cáo trên địa điểm này
            </Text>

            <InforAnySpaceComponent
              className=""
              address={addressGeocoding?.address}
              HandleTrue={() => HandleTrue(2)}
            />
          </div>
        )}
      </div>
    </>
  );
}
