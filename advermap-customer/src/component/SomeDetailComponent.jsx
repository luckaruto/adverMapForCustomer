import React from "react";
import Text from "./Text";

export default function SomeDetailComponent({
  format,
  type,
  address,
  planned,
  imgUrl,
}) {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <img src={imgUrl} className="object-contain" />
      <Text className="font-bold">{format}</Text>
      <Text>{type}</Text>
      <Text>{address}</Text>
      <Text className="font-bold ">{`${
        planned ? "Đã quy hoạch" : "Chưa quy hoạch"
      }`}</Text>
    </div>
  );
}
