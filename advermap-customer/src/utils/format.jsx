import React from "react";

export function formatDateTime(isoTimestamp) {
  const dateTime = new Date(isoTimestamp);

  const day = dateTime.getDate();
  const month = dateTime.toLocaleString("vi-VN", { month: "long" });
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  return `${hour} giờ ${minute} phút  -  ngày ${day}/${month}/${year}`;
}
