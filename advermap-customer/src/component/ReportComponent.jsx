import React from "react";
import { Carousel } from "@material-tailwind/react"; // Correct import
import Text from "./Text";
export default function ReportComponent({
  reportDate,
  state,
  address,
  content,
  email,
  name,
  phone,
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
        <Text className="font-extrabold text-[30px]">Hình thức báo cáo : </Text>
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
    </div>
  );
}
