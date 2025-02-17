import React from "react";

type CellProps = {
  value: "empty" | "black" | "white";
  onClick: () => void;
};

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  return (
    <div
      className="w-12 h-12 bg-green-600 flex items-center justify-center border border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      {value === "black" && <div className="w-10 h-10 bg-black rounded-full" />}
      {value === "white" && <div className="w-10 h-10 bg-white rounded-full" />}
    </div>
  );
};

export default Cell;
