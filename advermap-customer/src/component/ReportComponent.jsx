import React from "react";
import { Carousel } from "@material-tailwind/react"; // Correct import
import Text from "./Text";
import { formatDateTime } from "../utils/format";
export default function ReportComponent({
  reportDate,
  state,
  address,
  content,
  email,
  reportType,
  name,
  imgUrl,
  phone,
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
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>

      <div className="ml-3 flex flex-col gap-3">
        <Text className="font-extrabold text-[30px]">
          {`Hình thức báo cáo : ${reportType?.name}`}{" "}
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
        <Text className="font-medium">{`Ngày tạo: ${formatDateTime(
          reportDate
        )}`}</Text>

        <Text className="font-medium">{`Tình trạng xử lý: ${
          state ? "Đã xử lý" : "Đang xử lý"
        }`}</Text>
      </div>
    </div>
  );
}
