import React from "react";
import Text from "./Text";
import { useDispatch } from "react-redux";
import { ReactComponent as SvgReport } from "../images/report.svg";

export default function InforAnySpaceComponent({
  className,
  address,
  HandleTrue,
}) {
  const dispatch = useDispatch();
  return (
    <div className=" bg-green-200 bottom-0 m-2 p-2 rounded-xl border-gray-200 flex flex-col border-2 justify-end items-end ">
      <div className="ml-3 flex flex-col w-full">
        <Text className="font-extrabold text-xl">Thông tin địa điểm</Text>
        <Text>{address}</Text>
      </div>
      <div
        className="w-fit bottom-0 border-2 border-red-500 p-1 rounded-md flex flex-row gap-2  items-center cursor-pointer "
        onClick={() => {
          HandleTrue();
          //   dispatch(setSurface({ id: surfaceid, address: address }));
        }}
      >
        <SvgReport className="h-4 w-4" />
        <Text className="text-red-500">Báo cáo vi phạm</Text>
      </div>
    </div>
  );
}
