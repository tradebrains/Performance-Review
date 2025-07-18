"use client";
import { getUserData } from "@/api/fetchClient";
import { authStore } from "@/redux/reducer/authSlice";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserList() {
  const [Model, setModel] = React.useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      await getUserData().then((resp) => {
        setUserData(resp?.data);
      });
    };
    getUser();
  }, []);

  const authUserData = useSelector(authStore);
  console.log("authUserData", authUserData);

  const roleOptions = [
    {
      label: "Admin",
      value: "Admin",
    },
    {
      label: "Employee",
      value: "Employee",
    },
  ];

  const managerOptions = [
    {
      label: "Kritesh Abhishek",
      value: "Kritesh Abhishek",
    },
    {
      label: "Hitesh Singhi",
      value: "Hitesh Singhi",
    },
    {
      label: "Anoushka Roy",
      value: "Anoushka Roy",
    },
    {
      label: "Mohammed Mazhar Ahmed",
      value: "Mohammed Mazhar Ahmed",
    },
    {
      label: "Abdul Jaseem",
      value: "Abdul Jaseem",
    },
  ];

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
    setModel();
  };
  return (
    <div>
      <h1>User List</h1>
      {authUserData?.userData?.is_superuser === true && (
        <Button
          type="primary"
          onClick={() => {
            setModel(true);
          }}
        >
          Click
        </Button>
      )}
      <Modal
        title={""}
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
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: "Please select a User ID" }]}
            >
              <Select placeholder="Select User ID" className="select-custom">
                {userData.map((user) => (
                  <Option key={user.email} value={user.email}>
                    {user.email}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
              className="form-placeholder"
            >
              <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              label="Designation"
              name="designation"
              className="form-placeholder"
              rules={[{ required: true, message: "Please enter designation" }]}
            >
              <Input placeholder="Enter Designation" />
            </Form.Item>

            <Form.Item
              label="User Role"
              name="userRole"
              rules={[{ required: true, message: "Please select a user role" }]}
            >
              <Select placeholder="Select Role" className="select-custom">
                {roleOptions.map((role) => (
                  <Option key={role.value} value={role.value}>
                    {role.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Reporting Manager"
              name="reportingManager"
              rules={[{ required: true, message: "Please select a manager" }]}
            >
              <Select placeholder="Select Manager" className="select-custom">
                {managerOptions.map((manager) => (
                  <Option key={manager.value} value={manager.value}>
                    {manager.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default UserList;
