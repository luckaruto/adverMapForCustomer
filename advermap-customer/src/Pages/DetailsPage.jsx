import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailOfAdvertisement from "../component/DetailOfAdvertisement";

export default function DetailsPage() {
  const params = useParams();

  useEffect(() => {
    console.log(params.surfaceid);
  }, [params]);

  return <DetailOfAdvertisement />;
}
