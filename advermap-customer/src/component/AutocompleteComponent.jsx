import React, { useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { ReactComponent as SvgFind } from "../images/find.svg";
import { useDispatch } from "react-redux";
import { setGeocoding } from "../redux/navSlice";

export default function AutocompleteComponent() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      // console.log(place.formatted_address);
      // console.log(place.geometry.location.lat(), place.geometry.location.lng());
      dispatch(
        setGeocoding({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
      );
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB11l8Cra3wEure_mAn1gaOuNkWKnRY1YM"
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div className=" ml-3 flex flex-row  justify-center h-[100%] ">
          <div className="relative w-[90%] h-[40px] ">
            <div className="absolute left-1 m-auto top-1/2  transform -translate-y-1/2">
              <SvgFind className="h-8 w-8" />
            </div>
            <input
              type="text"
              className="pl-[40px] w-full h-full border-[3px] rounded-md border-black"
            ></input>
          </div>
        </div>
      </StandaloneSearchBox>
    </LoadScript>
  );
}
