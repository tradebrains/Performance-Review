"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { postLogin, postLoginData } from "@/api/fetchClient";
import { setAuth } from "@/redux/reducer/authSlice";
import Logo from "../../assets/logo/logo.png";
import styles from "../../app/page.module.css";

function LoginForm() {
  const [apiLoader, setApiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [form] = Form.useForm();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    setApiLoader(true);
    try {
      await postLogin(values).then((resp) => {
        if (resp?.status === 200) {
          window.location.href = "/dashboard";
        }
        cookie.set("performance_login_session", "true", { expires: 999 });
        cookie.set("performance_access_token", resp?.data?.tokens?.access, {
          expires: 999,
        });
        dispatch(setAuth(resp.data));

        setApiLoader(false);
      });
    } catch (error) {
      if (error !== undefined) {
        const errorMsg = Object?.values(error?.response?.data);
        setApiError(errorMsg[0]);
        setApiLoader(false);
      }
    }
  };

  return (
    <div>
      <div
        className={`table-shadow w-100
        `}
        style={{
          width: "500px",
          textAlign: "center",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#1e1e1e",
        }}
      >
        <div className="">
          <Image src={Logo} alt="Portal Icon" />
          <h3 className="mt-20">Login</h3>
          <p className="mt-20 mb-20">Login to access dashboard</p>
        </div>
        <div className="w-100">
          <Form
            autoComplete="off"
            form={form}
            name="login"
            onFinish={onSubmit}
            scrollToFirstError
          >
            <Form.Item
              style={{ margin: "15px 0px " }}
              name="email"
              className={`dark-input-login w-100
                        `}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please Enter your E-mail!",
                },
              ]}
            >
              <Input
                type="text"
                style={{ height: "40px" }}
                className={`
                          auth-form-input w-100`}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              className={`dark-input-login w-100
                        `}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                type="text"
                style={{ height: "40px", width: "100%" }}
                className="auth-form-input w-100"
                placeholder="Enter Password"
              />
            </Form.Item>
            {apiError && (
              <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                {apiError}
              </div>
            )}

            {apiLoader ? (
              <button className={styles.login_button}>Logging in....</button>
            ) : (
              <button type="submit" className={styles.login_button}>
                Login
              </button>
            )}
          </Form>
        </div>
        {/* <div class="light-rod">
          <div class="light-beam"></div>
          <div class="light-beam delay-1"></div>
          <div class="light-beam delay-2"></div>
          <div class="light-beam delay-3"></div>
          <div class="light-beam delay-4"></div>
          <div class="light-beam delay-5"></div>
          <div class="light-beam delay-6"></div>
          <div class="light-beam delay-7"></div>
        </div> */}
      </div>
    </div>
  );
}

export default LoginForm;
