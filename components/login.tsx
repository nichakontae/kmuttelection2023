import { coreContext } from "context/core_context";
import dayjs from "dayjs";
import { Observer } from "mobx-react-lite";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import axios from "../axios";
import logo from "../public/KMUTT_Logo.png";
import electionLogo from "../public/Logo.png";
import Button from "./button";

const Login = () => {
  const [isWrongAuthen, setIsWrongAuthen] = useState("");
  const context = useContext(coreContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const onSubmit = async () => {
    const body = JSON.stringify({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    if (usernameRef.current.value == "" || passwordRef.current.value == "") {
      return setIsWrongAuthen(
        "กรุณากรอกรหัสนักศึกษาและรหัสผ่านก่อนเข้าสู่ระบบ"
      );
    }
    if (
      dayjs().isAfter("2022-04-28T13:00:00.000z") ||
      dayjs().isBefore("2022-04-23T01:00:00.000z")
    ) {
      return setIsWrongAuthen(
        "ไม่สามารถเข้าระบบได้ เนื่องจากไม่อยู่ในช่วงลงคะแนน"
      );
    }
    axios
      .post("/api/auth/login", body)
      .then((response) => {
        let result = response.data;
        const User = (
          firstname,
          lastname,
          studentID,
          faculty,
          department,
          year,
          imagePath
        ) => {
          return {
            firstname: firstname,
            lastname: lastname,
            studentID: studentID,
            faculty: faculty,
            department: department,
            year: year,
            imagePath: imagePath,
          };
        };
        const user = User(
          result.firstnameTH,
          result.lastnameTH,
          result.studentId,
          result.facultyTH,
          result.fieldTH,
          result.studentYear,
          result.imagePath
        );
        context.setValue("user", user);
        context.setValue("token", result.jwttoken);
        // console.log(context.user);
        // console.log(context.token);
        context.stepUp();
      })
      .catch((error) => {
        if (error.response.data.status == 400) {
          setIsWrongAuthen(JSON.parse(error.response.data.message).th);
        }
      });
  };

  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full h-[90vh] pt-[68px] ">
          <div>
            <Image
              src={logo}
              height={70}
              width={70}
              objectFit="contain"
              alt="KMUTT"
            />
            <Image
              src={electionLogo}
              height={70}
              width={100}
              objectFit="contain"
              alt="KMUTT Election 2022"
            />
          </div>

          <div className="shrink-0 w-full flex flex-col justify-center my-px">
            <p className="w-full text-center text-[24px] font-bold">
              ระบบการเลือกตั้ง
            </p>
            <p className="w-full text-center text-[15px]">
              คณะกรรมการองค์การบริหารองค์การนักศึกษาและสภานักศึกษา
            </p>
            <p className="w-full text-center text-[15px]">
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
            </p>
          </div>

          <div className="shrink-0 bg-white p-5 w-[300px]">
            <div className="mb-2">
              <p className="w-full text-center text-base_gray text-[18px]">
                เข้าสู่ระบบด้วย KMUTT Internet Account
              </p>
            </div>
            <div className="mb-2">
              <input
                id="stuID"
                ref={usernameRef}
                type="text"
                className={
                  isWrongAuthen
                    ? "block w-full text-[18px] border-solid border-2 border-red-400 px-1 rounded"
                    : "block w-full text-[18px] border-solid border-2 border-gray-300 px-1 rounded"
                }
                placeholder="รหัสนักศึกษา"
                onKeyUp={(e) => {
                  e.key === "Enter" && onSubmit();
                }}
              />
            </div>
            <div className="mb-5">
              <input
                id="stuPass"
                ref={passwordRef}
                type="password"
                className={
                  isWrongAuthen
                    ? "block w-full text-[18px] border-solid border-2 border-red-400 px-1 rounded"
                    : "block w-full text-[18px] border-solid border-2 border-gray-300 px-1 rounded"
                }
                placeholder="รหัสผ่าน"
                onKeyUp={(e) => {
                  e.key === "Enter" && onSubmit();
                }}
              />
            </div>
            <div className="flex justify-center text-red-400 font-bold text-[16px]">
              {isWrongAuthen}
            </div>
            <a
              className="flex justify-center text-base_orange font-bold text-[16px]"
              href="https://myaccount.kmutt.ac.th/accountactivation-app/recovery-account"
            >
              ลืมรหัสผ่าน?
            </a>
          </div>

          <div className="mt-5 mb-5">
            <Button
              color="orange"
              title="เข้าสู่ระบบ"
              onClick={() => onSubmit()}
            />
          </div>
          <div className="flex justify-end">
            <p className="pr-1">สามารถติดตามข้อมูลข่าวสารเพิ่มเติมได้ที่</p>
            <a
              className="font-bold text-base_orange"
              href="https://www.facebook.com/KMUTT-Election-111526570306064"
            >
              KMUTT Election
            </a>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default Login;
