import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DetailOfAdvertisement from "../component/DetailOfAdvertisement";
import { SurfaceServices } from "../services/SurfaceServices";

export default function DetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { state: selectedSpace } = useLocation();

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

  useEffect(() => {
    fetchSurface();
  }, []);

  useEffect(()=>{
    if(!selectedSpace){
      navigate("/")
    }
  },[selectedSpace])

  return (
    <>
      {surface ? (
        <DetailOfAdvertisement
          width={surface.width}
          height={surface.height}
          format={surface.format}
          img_url={surface.imgUrl}
          content={surface.content}
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
