import React from "react";
import Header from "../../components/guest/Header";

function Admin() {
  return (
    <div>
      <Header isAuthenticated={() => true} />
    </div>
  );
}

export default Admin;
