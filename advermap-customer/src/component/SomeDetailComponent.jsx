import React from "react";
import Text from "./Text";

export default function SomeDetailComponent({
  format,
  type,
  address,
  planned,
}) {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <Text className="font-bold">{format}</Text>
      <Text>{type}</Text>
      <Text>{address}</Text>
      <Text className="font-bold ">{`${
        planned ? "Đã quy hoạch" : "Chưa quy hoạch"
      }`}</Text>
    </div>
  );
}
