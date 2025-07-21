"use client";
import { getUserData } from "@/api/fetchClient";
import { authStore } from "@/redux/reducer/authSlice";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./user.module.css";
import CustomTable from "@/components/CustomTable";

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

  const baseCellStyle = {
    background: "#1e1e1e",
    borderRight: "1px solid #2f2f2f",
    borderLeft: "1px solid #2f2f2f",
    borderBottom: "none",
  };

  const baseTextStyle = {
    fontSize: "14px",
    fontWeight: "400",
    color: "white",
  };

  const renderCell = (
    text,
    customStyle = {},
    extraClasses = "",
    onClick = null
  ) => ({
    props: { style: baseCellStyle },
    children: (
      <span
        onClick={onClick}
        className={`ff-lato ${extraClasses} ${
          onClick ? "pointer link-hover-underline" : ""
        }`}
        style={{ ...baseTextStyle, ...customStyle }}
      >
        {text}
      </span>
    ),
  });

  const columns = [
    {
      title: <span>Name </span>,
      dataIndex: "date",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderCell(new Date(text).toLocaleDateString()),
    },
    {
      title: <p>Email ID</p>,
      dataIndex: "name",
      width: "50px",
      render: (text, record) => renderCell(record?.name?.name || "-"),
    },
    {
      title: <p>Department</p>,
      dataIndex: "department",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Reporting Manager</p>,
      dataIndex: "supervisor",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
  ];

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
    setModel();
  };
  return (
    <div>
      <div className={styles.userListHeader}>
        <h3>User List</h3>

        {authUserData?.userData?.is_superuser === true && (
          <button
            type="primary"
            onClick={() => {
              setModel(true);
            }}
            className={styles.addUserButton}
          >
            Update User
          </button>
        )}
      </div>
      <div className={`custom-antd-head-dark`}>
        <CustomTable
          className="custom-ant-table"
          columns={columns}
          // data={TableData}
        />
      </div>
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
