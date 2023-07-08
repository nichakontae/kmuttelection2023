import { coreContext } from "context/core_context";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Button from "./button";

const SelectStep1 = () => {
  const context = useContext(coreContext);
  const [err, setErr] = useState(false);
  const [amountOfParty, setAmountOfParty] = useState(0);
  const fetchParty = async () => {
    await context.prepareParty();
    setAmountOfParty(_.size(context.partyList));
  };

  useEffect(() => {
    fetchParty();
    context.prepareCouncil();
  });

  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full h-[90vh] pt-[3rem]">
          <div className="flex flex-col justify-center w-full bg-base_yellow">
            <p className="w-full text-center text-[24px] font-bold">
              เลือกคณะกรรมการ
            </p>
            <p className="w-full text-center text-[24px]">
              องค์การบริหารองค์การนักศึกษา
            </p>
          </div>
          <p className=" w-full text-center text-[20px] mt-[10px]">
            โปรดเลือกเพียง 1 พรรคเท่านั้น
          </p>

          <form>
            <div className="flex flex-row justify-center w-full p-2">
              {_.map(context.partyList, (item) => (
                <div key={item.id}>
                  <label
                    className={
                      context.selectedParty == item.id
                        ? amountOfParty == 1
                          ? "flex flex-col p-3 rounded-md ml-1 mr-1"
                          : "flex flex-col p-3 bg-dim_brown bg-opacity-60 rounded-md ml-1 mr-1"
                        : "flex flex-col p-3 ml-1 mr-1"
                    }
                  >
                    <p className=" text-center text-[24px] font-bold ">
                      หมายเลข {item.id}
                    </p>
                    <p className=" text-center text-[24px] ">{item.name}</p>
                    <Image
                      src={context.apiPath + "/api/files/" + item.imageId}
                      width={250}
                      height={181}
                      alt="party"
                    />
                    <div className="flex justify-center w-full p-2">
                      {(() => {
                        if (amountOfParty == 1) {
                          context.setValue("selectedParty", item.id);
                          return "";
                        } else {
                          return (
                            <input
                              type="radio"
                              value={item.id}
                              checked={context.selectedParty == item.id}
                              onChange={(e) => {
                                setErr(false);
                                context.setValue(
                                  "selectedParty",
                                  e.target.value
                                );
                              }}
                              className="accent-base_blue"
                            />
                          );
                        }
                      })()}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-center text-base_orange font-bold text-[16px]">
              {err && "กรุณาเลือกพรรค หรือเลือกงดออกเสียง"}
            </div>
            <div className="flex flex-col items-center p-4">
              {(() => {
                if (amountOfParty == 1) {
                  return (
                    <>
                      <div className="flex space-x-2">
                        <Button
                          color="orange"
                          title="ไม่ยอมรับ"
                          onClick={() => {
                            if (context.selectedParty) {
                              context.stepUp();
                              context.setValue("partyVote", -1);
                            } else {
                              setErr(true);
                            }
                          }}
                        />
                        <Button
                          color="green"
                          title="ยอบรับ"
                          onClick={() => {
                            if (context.selectedParty) {
                              context.stepUp();
                              context.setValue("partyVote", 1);
                            } else {
                              setErr(true);
                            }
                          }}
                        />
                      </div>
                      <p className="p-2">หรือ</p>
                      <Button
                        color="gray"
                        title="งดออกเสียง"
                        onClick={() => {
                          context.stepUp();
                          context.setValue("selectedParty", "");
                          context.setValue("partyVote", 0);
                        }}
                      />
                    </>
                  );
                } else {
                  return (
                    <>
                      <Button
                        color="orange"
                        title="ยืนยัน"
                        onClick={() => {
                          if (context.selectedParty) {
                            context.stepUp();
                            context.setValue("partyVote", 1);
                          } else {
                            setErr(true);
                          }
                        }}
                      />
                      <p className="p-2">หรือ</p>
                      <Button
                        color="gray"
                        title="งดออกเสียง"
                        onClick={() => {
                          context.stepUp();
                          context.setValue("selectedParty", "");
                          context.setValue("partyVote", 0);
                        }}
                      />
                    </>
                  );
                }
              })()}
            </div>
          </form>
        </div>
      )}
    </Observer>
  );
};

export default SelectStep1;
