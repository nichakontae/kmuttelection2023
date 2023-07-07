import { coreContext } from "context/core_context";
import { Observer } from "mobx-react-lite";
import Image from "next/image";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import Button from "./button";
const ConfirmStep1 = () => {
  const context = useContext(coreContext);
  const [amountOfParty, setAmountOfParty] = useState(0);

  useEffect(() => {
    setAmountOfParty(_.size(context.partyList));
  }, []);

  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full h-[90vh] pt-[3rem]">
          <div
            className="flex flex-col justify-center w-full bg-white"
            style={{ background: "#F6C950" }}
          >
            <p className="w-full text-center text-[24px] font-bold ">
              ยืนยันการเลือกคณะกรรมการ
            </p>
            <p className="w-full text-center text-[24px] ">
              องค์การบริหารองค์การนักศึกษา
            </p>
          </div>
          <form>
            <div
              className="grid grid-rows-6 min-w-[358px] min-h-[400px] p-2 mt-8 bg-white rounded-2xl"
              style={{
                boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p className=" text-center text-[24px] font-bold">คุณเลือก</p>
              <div className="h-full row-span-5 pl-5 pr-5 pd-5">
                {context.selectedParty ? (
                  <>
                    {(() => {
                      if (amountOfParty == 1) {
                        return (
                          <div>
                            <p className=" text-center text-[24px] font-bold mt-[-2.5rem]">
                              {context.partyVote === 1 && (
                                <span className="text-green-600 text-[24px]">
                                  ยอมรับ
                                </span>
                              )}
                              {context.partyVote === -1 && (
                                <span className="text-base_orange text-[24px]">
                                  ไม่ยอมรับ
                                </span>
                              )}
                            </p>
                          </div>
                        );
                      } else {
                        return "";
                      }
                    })()}

                    <div
                      className={`flex flex-row justify-center p-1 ${
                        amountOfParty == 1 ? "" : "mt-[-3rem]"
                      }`}
                    >
                      <p className=" text-center text-[24px] font-bold ">
                        หมายเลข {context.selectedParty}
                        &nbsp;
                      </p>
                      <p className=" text-center text-[24px] ">
                        {context.findParty()?.name}
                      </p>
                    </div>
                    <Image
                      src={
                        context.apiPath +
                        "/api/files/" +
                        context.findParty()?.imageId
                      }
                      width={300}
                      height={`${amountOfParty == 1 ? 250 : 400}`}
                      alt="Party"
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-[36px] text-base_gray font-bold">
                    งดออกเสียง
                  </div>
                )}
              </div>
            </div>
          </form>
          {context.totalStep === 3 && (
            <div className="w-full text-center text-[20px] my-[20px]">
              <p>
                เมื่อเลือก <b>“เสร็จสิ้น”</b> จะไม่สามารถแก้ไขได้อีก
              </p>
              <p>คุณจะยืนยันการเลือกหรือไม่</p>
            </div>
          )}
          <div className="flex flex-row items-center p-4">
            <div className="p-3">
              <Button
                color="gray"
                title="แก้ไข"
                onClick={() => context.stepDown()}
              />
            </div>
            <div className="p-3">
              <Button
                color="orange"
                title={context.totalStep === 5 ? "ยืนยัน" : "เสร็จสิ้น"}
                disabled={context.submitting}
                onClick={() => {
                  if (context.totalStep === 5) {
                    context.stepUp();
                  }
                  if (context.totalStep === 3) {
                    context.postVoteResult();
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default ConfirmStep1;
