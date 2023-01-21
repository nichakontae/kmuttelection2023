import Image from "next/image";
import React from "react";
import finish from "../public/finish.png";

const Finish = () => {
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
          การเลือกตั้งสำเร็จ
        </p>
        <p className="text-center text-base_gray text-[16px]">
          <p>ขอบคุณที่ร่วมมาใช้สิทธิ์ของท่าน</p>
          <p>และขอบคุณที่เป็นส่วนหนึ่ง</p>
          <p>ในการเปลี่ยนแปลงมหาวิทยาลัยของพวกเรา</p>
        </p>
      </div>
    </div>
  );
};

export default Finish;
