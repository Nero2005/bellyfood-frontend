import React, { useEffect } from "react";
import Header from "../components/guest/Header";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  dashboard: () => string;
}

function Unauthorized({ dashboard }: Props) {
  const navigate = useNavigate();

  // const notification = toast.loading(
  //   "You're not authorized to go to this route"
  // );
  useEffect(() => {
    // setTimeout(() => {
    //   navigate(dashboard());
    // }, 1000);
    // toast.success("Success", {
    //   id: notification,
    // });
    navigate(dashboard());
  });

  return (
    <div>
      {/* <Header isAuthenticated={() => true} dashboard={dashboard} /> */}
    </div>
  );
}

export default Unauthorized;
