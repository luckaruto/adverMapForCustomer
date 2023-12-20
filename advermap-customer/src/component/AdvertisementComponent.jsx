import React from "react";
import Text from "./Text";
import { ReactComponent as SvgInformation } from "../images/information.svg";
import { ReactComponent as SvgReport } from "../images/report.svg";

export default function AdvertisementComponent({
  format,
  width,
  height,
  type,
  formatspace,
  address,
  className,
}) {
  return (
    <div className={`flex flex-col border-2 rounded-sm ${className}`}>
      <div className="flex flex-col gap-2">
        <Text className="font-extrabold text-xl">{format}</Text>
        <Text className="font-extralight text-base">{address}</Text>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row">
          <Text>{`Kích thước: ${width}m X ${height}m`} </Text>
        </div>
        <div className="flex flex-row">
          <Text>{`Số lượng: `} </Text>
        </div>
        <div className="flex flex-row">
          <Text>{`Hình thức: ${formatspace}`} </Text>
        </div>
        <div className="flex flex-row">
          <Text>{`Phân loại: ${type}`} </Text>
        </div>
        <div className="flex flex-row justify-between items-center">
          <SvgInformation className="h-6 w-6" />
          <div className="border-2 border-red-500 p-1 rounded-md flex flex-row gap-2 justify-center items-center">
            <SvgReport className="h-4 w-4" />
            <Text className="text-red-500">Báo cáo vi phạm</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
