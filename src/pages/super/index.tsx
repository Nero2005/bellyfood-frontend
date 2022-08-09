import React from "react";
import Header from "../../components/guest/Header";

function Super() {
  return (
    <div>
      <Header isAuthenticated={() => true} />
    </div>
  );
}

export default Super;
