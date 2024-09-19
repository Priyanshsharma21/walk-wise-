import React from "react";

const Check = ({ height, component }) => {
  return (
    <div
      style={{ height: height }}
      className="w-full text-2xl text-white flex justify-center items-center sticky top-0"
    >
      {component}
    </div>
  );
};

export default Check;
