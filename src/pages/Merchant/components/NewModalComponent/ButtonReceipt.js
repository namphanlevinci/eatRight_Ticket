import React from "react";

export default function ButtonReceipt({
  title,
  onPress,
  borderColor,
  background,
  textColor,
}) {
  return (
    <div
      style={{
        height: 44,
        width: 128,
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
