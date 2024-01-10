import React from "react";
import Text from "./Text";
import advertisementGreen from "../images/advertisementGreen.png";
import advertisementOrange from "../images/advertisementOrange.png";
import advertisementRed from "../images/advertisementRed.png";
import reportRed from "../images/reportRed.png";
import ReportGreen from "../images/reportGreen.png";

export default function DescriptionComponent({ className }) {
  return (
    <div className={`flex flex-wrap w-[50%] h-fit gap-2 ${className} `}>
      <div className="flex flex-row items-center gap-2">
        <img src={advertisementGreen} className="h-5 w-5" />
        <Text className="text-white"> Đã được quy hoạch</Text>
      </div>
      <div className="flex flex-row gap-2  items-center">
        <img src={advertisementOrange} className="h-5 w-5"></img>
        <Text className="text-white"> Đã được quy hoạch và có quảng cáo</Text>
      </div>
      <div className="flex flex-row gap-2  items-center">
        <img src={advertisementRed} className="h-5 w-5"></img>
        <Text className="text-white">Chưa được quy hoạch</Text>
      </div>
      <div className="flex flex-row items-center gap-2">
        <img src={reportRed} className="h-5 w-5" />
        <Text className="text-white"> Báo cáo chưa được xử lý</Text>
      </div>
      <div className="flex flex-row items-center gap-2">
        <img src={ReportGreen} className="h-5 w-5" />
        <Text className="text-white"> Báo cáo đã được xử lý</Text>
      </div>
    </div>
  );
}
