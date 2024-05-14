import React from "react";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const navigate = useNavigate();

  const book = () => {
    navigate("/loginSignup/slot");
  };

  const result = () => {
    navigate("/result");
  };
  return (
    <div
      style={{
        display: "flex", // Use flexbox for layout
        flexDirection: "column", // Stack children vertically
        justifyContent: "center", // Center vertically in the flex container
        alignItems: "center", // Center horizontally in the flex container
        height: "100vh", // Use full height of the viewport
        backgroundColor: "#007bff",
      }}
    >
      <button style={{ margin: "10px" }} onClick={book}>
        Slot Booking
      </button>
      <button style={{ margin: "10px" }} onClick={result}>
        Result
      </button>
    </div>
  );
};

export default Options;
