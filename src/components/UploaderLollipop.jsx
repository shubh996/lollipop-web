import React from "react";

export default function UploaderLollipop({ name, profilePic }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#E6F4EA",
        borderRadius: 8,
        padding: "4px 12px",
        fontFamily: 'inherit',
        fontWeight: 500,
        fontSize: 16,
        color: "#219653",
        gap: 8,
      }}
    >
      <img
        src={profilePic}
        alt={name}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: 6,
          border: "2px solid #219653",
        }}
      />
      <span style={{ color: "#219653", fontWeight: 500 }}>{name}</span>
    </div>
  );
}
