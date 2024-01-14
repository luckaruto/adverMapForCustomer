import React, { useRef, useState, useEffect } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
} from "@react-google-maps/api";
import { ReactComponent as SvgFind } from "../images/find.svg";
import { useDispatch } from "react-redux";
import { setGeocoding } from "../redux/navSlice";

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true;
    const isBrowser = typeof document !== "undefined"; // require('@react-google-maps/api/src/utils/isbrowser')
    const isAlreadyLoaded =
      window.google &&
      window.google.maps &&
      document.querySelector("body.first-hit-completed"); // AJAX page loading system is adding this class the first time the app is loaded
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }

      this.isCleaningUp().then(this.injectScript);
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true });
    }
  }
}

export default function AutocompleteComponent() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      dispatch(
        setGeocoding({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
      );
    }
  };

  return (
    <LoadScriptOnlyIfNeeded
      googleMapsApiKey={window.env.GOOGLE_API}
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div className="ml-3 flex flex-row justify-center h-[100%]">
          <div className="relative w-[90%] h-[40px]">
            <div className="absolute left-1 m-auto top-1/2 transform -translate-y-1/2">
              <SvgFind className="h-8 w-8" />
            </div>
            <input
              type="text"
              className="pl-[40px] w-full h-full border-[3px] rounded-md border-black"
            />
          </div>
        </div>
      </StandaloneSearchBox>
    </LoadScriptOnlyIfNeeded>
  );
}
