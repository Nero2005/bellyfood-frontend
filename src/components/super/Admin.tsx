import React from "react";
import { UserState } from "../../store/userReducer";

interface Props {
  admin: UserState;
}

function Admin({ admin }: Props) {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="flex space-x-8 md:space-x-32 justify-center py-3 items-center bg-white">
        <h1>{admin.name}</h1>
      </div>
    </div>
  );
}

export default Admin;
