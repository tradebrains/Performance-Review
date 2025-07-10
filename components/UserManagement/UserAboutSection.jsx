import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Image, message } from "antd";
import styles from "./User.module.css";
import { putUserRoleUpdate } from "@/api/fetchClient";

const UserAboutSection = ({ userData }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  const dropdownRoles = [
    {
      label: "Administrator",
      value: "admin",
    },
    {
      label: "User",
      value: "user",
    },
  ];
  const { Option } = Select;

  const handleChange = async (value) => {
    const payload = {
      email: userData?.email,
      type: value,
    };
    const res = await putUserRoleUpdate(payload);
    if (res?.success) {
      success(res?.success);
    }
  };
  const onFinish = (values) => {};

  return (
    <>
      {contextHolder}
      {userData !== undefined && (
        <>
          <h1 className="fs-27-16 fw-600  mb-10">About the User</h1>
          <div className="flex mb-20">
            <div>
              <h2>{userData?.username}</h2>
              <p>{userData?.email}</p>
            </div>
          </div>
          <Form
            form={form}
            initialValues={userData}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            className={styles.form_container}
          >
            <Form.Item name="username" label="Username*">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="email" label="Email*">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="name" label="Display Name">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Select
                className={"contact-select-dark "}
                dropdownClassName={`${"drop-down-stock invert-text"}`}
                value={"Asdasd"}
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",
                  height: "40px",
                  margin: "6px 0px",
                }}
              >
                {dropdownRoles.map((items, i) => (
                  <Option key={i} value={items.value}>
                    {items.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default UserAboutSection;
