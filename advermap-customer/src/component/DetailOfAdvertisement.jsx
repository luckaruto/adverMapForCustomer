import React from "react";
import markerImage from "../images/marker.png";
import { Carousel } from "@material-tailwind/react"; // Correct import
import Text from "./Text";
import { formatDate } from "../services/utils";

export default function DetailOfAdvertisement({
  format,
  width,
  height,
  img_url,
  content,
  created_at,
  updated_at,
  type,
  formatspace,
  address,
  className,
}) {
  return (
    <div className="h-full w-full flex flex-row">
      <Carousel
        transition={{ duration: 2 }}
        className="rounded-e-xl h-full w-[60%]"
      >
        <img
          src={img_url}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        
      </Carousel>
      <div className="ml-3 flex flex-col gap-3">
        <Text className="font-extrabold text-[30px]">
          Thông tin chi tiết :{" "}
        </Text>
        <Text className="font-medium">{`Loại biển quảng cáo: ${format}`}</Text>
        <Text className="font-thin">{`${address}`}</Text>
        <Text className="font-medium">
          {`Kích thước: ${width}m x ${height}m`}
        </Text>
        <Text className="font-medium">{`Nội dung biển quảng cáo: ${content}`}</Text>
        <Text className="font-medium">{`Ngày đặt: ${formatDate(created_at)} - Ngày đến hạn: ${formatDate(updated_at)}`}</Text>
        <Text className="font-medium">{`Phân loại: ${type}`}</Text>
        <Text className="font-medium">{`Hình thức: ${formatspace}`}</Text>

        <Text className="font-medium">{`Loại biển quảng cáo: ${format}`}</Text>
      </div>
    </div>
  );
}
