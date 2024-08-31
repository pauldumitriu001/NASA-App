import React from "react";

export default function Main(props) {
  const { url } = props;
  return (
    <div className="imgContainer">
      <img src={url} alt="mars" className="bgimage" />
    </div>
  );
}
