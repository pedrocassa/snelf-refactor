import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  // <div style={{ textAlign: "-webkit-center", padding: "30px" }}>Realizando o treinamento do modelo. Este procedimento pode demorar.</div>
  return (
    <div>
        <div className="spinner-container">
        <div className="loading-spinner"></div>
        </div>
    </div>
  );
}