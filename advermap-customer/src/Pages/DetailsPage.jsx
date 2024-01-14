import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DetailOfAdvertisement from "../component/DetailOfAdvertisement";
import { SurfaceServices } from "../services/SurfaceServices";
import { useDispatch } from "react-redux";
import { setSpaceInfo, setAddressGeocoding } from "../redux/navSlice";
import ModelReport from "../component/ModelReport";

export default function DetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { state: selectedSpace } = useLocation();
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const [surface, setSurface] = useState(null);

  const fetchSurface = async () => {
    try {
      const data = await SurfaceServices.getById(params.surfaceId);
      setSurface(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleTrue = () => {
    setState(true);
    dispatch(setSpaceInfo(null));
    dispatch(setAddressGeocoding(null));
  };

  const HandleFalse = () => {
    setState(false);
    navigate("/");
  };

  useEffect(() => {
    fetchSurface();
  }, []);

  useEffect(() => {
    if (!selectedSpace) {
      navigate("/");
    }
  }, [selectedSpace]);

  return (
    <>
      {state == true && <ModelReport HandleFalse={HandleFalse} />}
      {surface ? (
        <DetailOfAdvertisement
          width={surface.width}
          height={surface.height}
          format={surface.format}
          imgUrl={surface.imgUrl}
          content={surface.content}
          HandleTrue={HandleTrue}
          surfaceid={surface.id}
          created_at={surface.createdAt}
          updated_at={surface.expiredDate}
          formatspace={selectedSpace.format}
          type={selectedSpace.type}
          address={selectedSpace.address}
        />
      ) : (
        <div> Pending</div>
      )}
    </>
  );
}
