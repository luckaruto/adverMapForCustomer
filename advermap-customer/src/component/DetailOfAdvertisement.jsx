import React from "react";
import markerImage from "../images/marker.png";
import { Carousel } from "@material-tailwind/react"; // Correct import
import Text from "./Text";
import { ReactComponent as SvgReport } from "../images/report.svg";
import { useDispatch } from "react-redux";
import { setSurface } from "../redux/navSlice";
export default function DetailOfAdvertisement({
  format,
  width,
  height,
  imgUrl,
  content,
  created_at,
  updated_at,
  type,
  formatspace,
  HandleTrue,
  surfaceid,
  address,
  className,
}) {
  function parseImageUrls(imageUrlsString) {
    if (!imageUrlsString) {
      return [];
    }

    // Split the string into an array using the comma as the delimiter
    const imageUrlsArray = imageUrlsString.split(",");

    // Trim each URL to remove leading/trailing whitespaces
    const trimmedImageUrls = imageUrlsArray.map((url) => url.trim());

    return trimmedImageUrls;
  }
  const dispatch = useDispatch();

  const imageUrlsArray = parseImageUrls(imgUrl);

  return (
    <div className="h-full w-full flex flex-row">
      <Carousel
        transition={{ duration: 2 }}
        className="rounded-e-xl h-full w-[60%]"
      >
        {imageUrlsArray.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="image 1"
            className="h-full w-full object-contain"
          />
        ))}
      </Carousel>
      <div className="ml-3 flex flex-col gap-3">
        <Text className="font-extrabold text-[30px]">
          Thông tin chi tiết :{" "}
        </Text>
        <Text className="font-medium">{`Loại biển quảng cáo: ${format}`}</Text>
        <Text className="font-thin">{`${address}`}</Text>
        <Text className="font-medium">
          {`Kích thước: ${width}m X ${height}m`}
        </Text>
        <Text className="font-medium">{`Nội dung biển quảng cáo: ${content}`}</Text>
        <Text className="font-medium">{`Ngày đặt: ${created_at} - Ngày đến hạn: ${updated_at}`}</Text>
        <Text className="font-medium">{`Phân loại: ${type}`}</Text>
        <Text className="font-medium">{`Hình thức: ${formatspace}`}</Text>

        <Text className="font-medium">{`Loại biển quảng cáo: ${format}`}</Text>
        <div
          className="border-2 border-red-500 p-1 rounded-md flex flex-row gap-2 justify-center items-center cursor-pointer "
          onClick={() => {
            HandleTrue();
            dispatch(setSurface({ id: surfaceid, address: address }));
          }}
        >
          <SvgReport className="h-4 w-4" />
          <Text className="text-red-500">Báo cáo vi phạm</Text>
        </div>
      </div>
    </div>
  );
}
