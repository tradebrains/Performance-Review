"use client";
import { getManagersList, getUserData } from "@/api/fetchClient";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./user.module.css";
import CustomTable from "@/components/CustomTable";

function UserList() {
  const [Model, setModel] = React.useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [userData, setUserData] = useState([]);
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      await getUserData().then((resp) => {
        setUserData(resp?.data);
      });
    };
    getUser();
  }, []);

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

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const resp = await getManagersList();
        if (resp?.status === 200) {
          setManagers(resp?.data);
        } else {
        }
      } catch (error) {}
    };
    fetchManagers();
  }, []);

  const columns = [
    {
      title: <span>Name </span>,
      dataIndex: "employee_name",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderCell(text || ""),
    },
    {
      title: <p>Email ID</p>,
      dataIndex: "email",
      width: "50px",
      render: (text, record) => renderCell(text || ""),
    },
    {
      title: <p>Department</p>,
      dataIndex: "designation",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Reporting Manager</p>,
      dataIndex: "reporting_manager",
      width: "50px",
      render: (text) =>
        renderCell(managers?.find((m) => m.id === text)?.name || ""),
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
      </div>
      <div className={`custom-antd-head-dark`}>
        <CustomTable
          className="custom-ant-table"
          columns={columns}
          data={userData}
        />
      </div>
    </div>
  );
}

export default UserList;
