import React from "react";

function NotFound() {
  return (
    <div>
      <div onClick={() => window.location.reload()}>
        Click to reload {window.location.href}
      </div>
    </div>
  );
}

export default NotFound;
