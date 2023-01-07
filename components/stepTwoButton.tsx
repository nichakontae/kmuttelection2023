import React from "react";

interface ButtonProp {
  color: "green" | "orange" | "gray";
  active: boolean;
  onClick: Function;
}

const StepTwoButton = ({ color, active, onClick }: ButtonProp) => {
  return (
    <div
      className={`w-[53px] h-[16px] rounded-[2px] text-[13px] flex items-center justify-center shadow-gray-400 shadow-md cursor-pointer ${
        color === "orange" && active && "bg-base_orange text-white"
      } ${color === "green" && active && "bg-base_green text-black"} ${
        color === "gray" && active && "bg-dim_gray text-black"
      } ${!active && "bg-[#F7F7FA] text-black"}`}
      onClick={() => onClick()}
    >
      {color === "green" && "ยอมรับ"}
      {color === "orange" && "ไม่ยอมรับ"}
      {color === "gray" && "งดออกเสียง"}
    </div>
  );
};

export default StepTwoButton;
