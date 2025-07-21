"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { getEmployeeDetails, postLogin, postRegister } from "@/api/fetchClient";
import { setAuth } from "@/redux/reducer/authSlice";
import { setEmployee } from "@/redux/reducer/employeeSlice";
import Logo from "../../assets/logo/logo.png";
import styles from "../../app/page.module.css";

function LoginForm() {
  const [apiLoader, setApiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [form] = Form.useForm();
  const [formRegister] = Form.useForm();
  const dispatch = useDispatch();
  const [Model, setModel] = useState(false);
  const onSubmit = async (values) => {
    setApiLoader(true);
    setApiError(null);

    try {
      const resp = await postLogin(values);

      if (resp?.status === 200) {
        cookie.set("performance_login_session", "true", { expires: 999 });
        cookie.set("performance_access_token", resp?.data?.tokens?.access, {
          expires: 999,
        });
        window.location.href = "/dashboard";
        dispatch(setAuth(resp.data));
        // const email = resp?.data?.email;
        // setEmail(email);
        // dispatch(setAuth(resp.data));

        // const employeeResp = await getEmployeeDetails(email);
        // console.log(employeeResp, "employeeResp");

        // if (employeeResp?.status === 200) {
        //   dispatch(setEmployee(employeeResp.data));
        // } else {
        //   setApiError("Failed to fetch employee details.");
        // }
      } else {
        setApiError("Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);

      const errorMsg =
        error?.response?.data?.detail ||
        error?.message ||
        "Login failed. Please check your credentials.";

      setApiError(errorMsg);
    } finally {
      setApiLoader(false);
    }
  };

  const [registerLoader, setRegisterLoader] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const onSubmitRegister = async (values) => {
    setRegisterLoader(true);
    setRegisterError(null);

    try {
      const resp = await postRegister(values);

      if (resp?.status === 201) {
        setModel(false);
        setRegisterError("Registration successful. Please log in.");
        alert("Registration successful. Please log in.");
      } else {
        setRegisterError("Invalid registration credentials.");
      }
    } catch (error) {
    } finally {
      setRegisterLoader(false);
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
          <p>
            Don't have an account yet?{" "}
            <span className={styles.register} onClick={() => setModel(true)}>
              Register
            </span>
          </p>
        </div>
        <Modal
          title={<p className={`${styles.register_title_modal}`}>Register</p>}
          visible={Model}
          centered
          className="modelClassname"
          wrapClassName={"modelClassname"}
          onCancel={() => {
            setModel(false);
          }}
          footer={[""]}
        >
          <div className="w-100">
            <Form
              autoComplete="off"
              form={formRegister}
              name="login"
              onFinish={onSubmitRegister}
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
                style={{ margin: "15px 0px " }}
                name="username"
                className={`dark-input-login w-100
                        `}
                rules={[
                  {
                    type: "username",
                    message: "The input is not valid!",
                  },
                  {
                    required: true,
                    message: "Please Enter Username!",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ height: "40px" }}
                  className={`
                          auth-form-input w-100`}
                  placeholder="Username"
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
              {registerError && (
                <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                  {registerError}
                </div>
              )}

              <button type="submit" className={styles.login_button}>
                Register
              </button>
            </Form>
            <div className={styles.register_footer}>
              <p>
                Already have an account?{" "}
                <span
                  className={styles.register}
                  onClick={() => setModel(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default LoginForm;
