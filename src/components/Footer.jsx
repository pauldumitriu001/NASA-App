import React from "react";

export default function Footer(props) {
  const { data, handleToggleModal } = props;
  return (
    <footer>
      <div className="bgGradient"></div>
      <div>
        <h2>{data.title}</h2>
        <h1>{data.copyright}</h1>
      </div>
      <button onClick={handleToggleModal}>
        <i href="https://api.nasa.gov/" className="fa-solid fa-circle-info"></i>
      </button>
    </footer>
  );
}
