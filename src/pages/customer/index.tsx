import React from "react";
import Header from "../../components/guest/Header";

function Customer() {
  return (
    <div>
      <Header isAuthenticated={() => true} />
    </div>
  );
}

export default Customer;
