import { coreContext } from "context/core_context";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Button from "./button";

const ConfirmStep2 = () => {
  const context = useContext(coreContext);

  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full h-[90vh] pt-[68px]">
          <div className="w-full bg-white flex flex-col justify-center" style={{ background: "#F6C950" }}>
            <p className="w-full text-center text-[24px] font-bold">
              ยืนยันการเลือกสภานักศึกษา
            </p>
            <p className="w-full text-center text-[24px]">{context.user.faculty}</p>
          </div>
          <div className="md:w-[580px] sm:w-[460px] mt-[45px] w-full px-6 pb-5 space-y-[14px] bg-white">
            <div className="flex flex-col space-y-3 px-4 md:px-16 pb-6" style={{ 
                boxShadow:" 0px 4px 10px rgba(0, 0, 0, 0.25)",
                borderRadius: "9px"
                }}>
              <div className="flex w-full pt-[11px]">
                <div className="flex items-center justify-center w-1/2 text-[18px] font-bold">
                  ชื่อผู้สมัครสภาฯ
                </div>
                <div className="flex items-center justify-center w-1/2 text-[18px] font-bold">
                  สถานะที่เลือก
                </div>
              </div>
              {_.map(context.councilList, (item) => (
                <div className="flex w-full border-b-2 border-dim_gray">
                  <div className="flex items-center w-1/2 md:px-8 text-[16px] font-bold py-1">
                    {`${item.firstname} ${item.lastname}`}
                  </div>
                  <div className="flex items-center w-1/2 py-1 pl-[45px] md:px-16 space-x-3">
                    <div
                      className={`w-[7px] h-[7px] rounded-full ${
                        item.vote === 0 && "bg-dim_gray"
                      }
                      ${item.vote === 1 && "bg-base_green"}
                      ${item.vote === -1 && "bg-base_orange"}`}
                    ></div>
                    <div className="text-[16px]">
                      {item.vote === 0 && "งดออกเสียง"}
                      {item.vote === 1 && "ยอบรับ"}
                      {item.vote === -1 && "ไม่ยอมรับ"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full text-center text-[20px] my-[20px]">
            <p>
              เมื่อเลือก <b>“เสร็จสิ้น”</b> จะไม่สามารถแก้ไขได้อีก
            </p>
            <p>คุณจะยืนยันการเลือกหรือไม่</p>
          </div>
          <div className="flex space-x-[6px]">
            <Button
              color="gray"
              title="แก้ไข"
              onClick={() => context.stepDown()}
            />
            <Button
              color="orange"
              title="เสร็จสิ้น"
              disabled={context.submitting}
              onClick={() => context.postVoteResult()}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

export default ConfirmStep2;
