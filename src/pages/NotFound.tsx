import React, { useEffect } from "react";

function NotFound() {
  interface Obj {
    num1: number;
    num2?: number;
  }

  const obj: Obj = {
    num1: 2,
  };
  obj.num2 = obj.num1 * 2;

  useEffect(() => {
    console.log(obj);
  });

  return (
    <div>
      <div onClick={() => window.location.reload()}>
        Click to reload {window.location.href}
      </div>
    </div>
  );
}

export default NotFound;
