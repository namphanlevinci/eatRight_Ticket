import React from "react";

export default function ButtonAction({
  title,
  onPress,
  borderColor,
  background,
  textColor,
  width = "100%",
  height = 56,
}) {
  return (
    <div
      style={{
        height: height,
        width: width,
        borderRadius: 8,
        border: `1px solid var(${borderColor})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `var(${background})`,
        cursor: "pointer",
      }}
      onClick={onPress}
    >
      <span
        style={{ color: `var(${textColor})`, fontSize: 16, fontWeight: 600 }}
      >
        {title}
      </span>
    </div>
  );
}
