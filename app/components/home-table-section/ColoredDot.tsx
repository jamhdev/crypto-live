import React from "react";

export default function ColoredDot({
  color,
  height = "6px",
  width = "6px",
}: {
  color: string;
  height?: string;
  width?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        borderRadius: "100%",
      }}
    ></div>
  );
}
