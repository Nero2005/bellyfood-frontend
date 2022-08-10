import React from "react";
import Header from "../../components/guest/Header";

interface Props {
  dashboard: () => string;
}

function Super({ dashboard }: Props) {
  return (
    <div>
      <Header isAuthenticated={() => true} dashboard={dashboard} />
    </div>
  );
}

export default Super;
