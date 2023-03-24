import Image from "next/image";
import React from "react";
import finish from "../public/thank-you.png";

const FinishNoCouncil = () => {
  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <div className="w-[272px] h-[286px] bg-white flex flex-col pt-[37px] rounded-2xl shadow-2xl">
        <Image
          src={finish}
          width={118}
          height={118}
          objectFit="contain"
          alt="Thank you"
        />
        <p className="pt-3 text-center text-[24px] font-bold">
            คณะของคุณไม่มีผู้สมัครสภานักศึกษา
        </p>
        <p className="text-center text-base_gray text-[16px]">
          <p>ขอบคุณสำหรับความร่วมมือ</p>
          <p>และขอบคุณที่เป็นส่วนหนึ่ง</p>
          <p>ในการเปลี่ยนแปลงมหาวิทยาลัยของพวกเรา</p>
        </p>
      </div>
    </div>
  );
};

export default FinishNoCouncil;
