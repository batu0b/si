import React from "react";

export default function CenterPage(props) {
  return (
    <div className="centerPage" style={{ background: "#fff", borderRadius: 7 }}>
      {props.children}
    </div>
  );
}
