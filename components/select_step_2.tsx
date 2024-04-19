import { coreContext } from "context/core_context";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Button from "./button";
import StepTwoButton from "./stepTwoButton";

const SelectStep2 = () => {
  const context = useContext(coreContext);
  const [err, setErr] = useState(false);
  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full h-[90vh] pt-[3rem]">
          <div className="w-full bg-base_yellow flex flex-col justify-center">
            <p className="w-full text-center text-[24px] font-bold">
              เลือกสภานักศึกษา
            </p>
            <p className="w-full text-center text-[24px]">
              {context.user.faculty}
            </p>
          </div>
          <div className="w-full text-center text-[20px] mt-6">
            โปรดพิจารณาสภานักศึกษาให้ครบทุกคน
          </div>
          <div className="lg:w-full w-full px-6 mt-10 lg:px-[128px] mb-10 grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10">
            {_.map(context.councilList, (item, index) => (
              <div className="bg-white h-[107px] flex px-[22px] py-4 space-x-3 rounded-2xl shadow-lg">
                <Image
                  src={context.apiPath + "/api/files/" + item.imageId}
                  width={61}
                  height={75}
                  objectFit="contain"
                  alt="Nominee"
                />
                <div className="flex flex-col justify-center h-full pl-6">
                  <div className="font-bold text-[18px]">
                    {`${item.firstname} ${item.lastname}`}
                  </div>
                  <div className="text-[16px]">
                    ภาควิชา{item.field} ชั้นปีที่{" "}
                    {67 - parseInt(item.studentId.substring(0, 2))}
                  </div>
                  <div className="flex space-x-3 pt-[6px]">
                    <StepTwoButton
                      active={item.vote === 1}
                      color="green"
                      onClick={() => {
                        context.setVote(index, 1);
                        if (
                          _.size(
                            _.filter(
                              context.councilList,
                              (item) => item.vote === -2
                            )
                          ) === 0
                        ) {
                          setErr(false);
                        }
                      }}
                    />
                    <StepTwoButton
                      active={item.vote === -1}
                      color="orange"
                      onClick={() => {
                        context.setVote(index, -1);
                        if (
                          _.size(
                            _.filter(
                              context.councilList,
                              (item) => item.vote === -2
                            )
                          ) === 0
                        ) {
                          setErr(false);
                        }
                      }}
                    />
                    <StepTwoButton
                      active={item.vote === 0}
                      color="gray"
                      onClick={() => {
                        context.setVote(index, 0);
                        if (
                          _.size(
                            _.filter(
                              context.councilList,
                              (item) => item.vote === -2
                            )
                          ) === 0
                        ) {
                          setErr(false);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center text-base_orange font-bold text-[16px]">
            {err && "กรุณาพิจารณาสภานักศึกษาให้ครบทุกคน"}
          </div>
          <Button
            color="orange"
            title="ยืนยัน"
            onClick={() => {
              if (
                _.size(
                  _.filter(context.councilList, (item) => item.vote === -2)
                ) === 0
              ) {
                context.stepUp();
              } else {
                setErr(true);
              }
            }}
          />
        </div>
      )}
    </Observer>
  );
};

export default SelectStep2;
