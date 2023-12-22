import React from "react";
import markerImage from "../images/marker.png";
import { Carousel } from "@material-tailwind/react"; // Correct import
import Text from "./Text";

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
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
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
          {`Kích thước: ${width}m X ${height}m`}
        </Text>
        <Text className="font-medium">{`Nội dung biển quảng cáo: ${content}`}</Text>
        <Text className="font-medium">{`Ngày đặt: ${created_at} - Ngày đến hạng: ${updated_at}`}</Text>
        <Text className="font-medium">{`Phân loại: ${type}`}</Text>
        <Text className="font-medium">{`Hình thức: ${formatspace}`}</Text>

        <Text className="font-medium">{`Loại biển quảng cáo: ${format}`}</Text>
      </div>
    </div>
  );
}
