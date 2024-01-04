import React from "react";
import { Carousel } from "@material-tailwind/react"; // Correct import
import Text from "./Text";
export default function ReportComponent({
  reportDate,
  state,
  address,
  content,
  email,
  format,
  name,
  phone,
  className,
}) {
  return (
    <div className="h-full  m-auto flex flex-col items-center gap-4 mt-3">
      <Text className="font-extrabold text-[30px]">
        {`Hình thức báo cáo : ${format}`}{" "}
      </Text>
      <Text className="font-medium">{`Họ và tên: ${name}`}</Text>
      <Text className="font-thin">{`${address}`}</Text>
      <Text className="font-medium">{`Email: ${email}`}</Text>
      <Text className="font-medium">{`Phone: ${phone}`}</Text>
      <Text className="font-medium">{`Nội dung báo cáo:`}</Text>
      <div
        className="bg-[#f6eee3] p-4 rounded-md"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Text className="font-medium">{`Ngày tạo: ${reportDate}`}</Text>

      <Text className="font-medium">{`Tình trạng xử lý: ${
        state ? "Đã xử lý" : "Đang xử lý"
      }`}</Text>
    </div>
  );
}
