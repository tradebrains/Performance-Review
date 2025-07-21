"use client";

import React, { useEffect } from "react";
import ProtectedRoute from "../utility/client-redirect";
import { getAnnouncementData, getSearchData } from "@/api/fetchClient";
import styles from "./dashboard.module.css";
import { Spin } from "antd";
import CustomTable from "@/components/CustomTable";

function Dashboard() {
  const [TableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getAnnouncements = async () => {
    setLoading(true);
    await getAnnouncementData().then((resp) => {
      setTableData(resp?.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAnnouncements();
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

  const columns = [
    {
      title: <span>Date</span>,
      dataIndex: "notification_date",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderCell(new Date(text).toLocaleDateString()),
    },
    {
      title: <p>Announcement</p>,
      dataIndex: "notification_title",
      width: "200px",
      render: (text, record) =>
        renderCell(
          <>
            <strong>{record.notification_title}</strong>
            <br />
            <span>{record.notification_description}</span>
          </>
        ),
    },
  ];

  return (
    <ProtectedRoute>
      <div className={`custom-antd-head-dark`}>
        <div className={styles.table_wrapper}>
          {loading ? (
            <div className={styles.loader_overlay}>
              <span className={styles.loader_spinner}>
                <Spin size="large" tip="Loading..." />
              </span>
            </div>
          ) : (
            <div>
              <CustomTable
                className="custom-ant-table"
                columns={columns}
                data={TableData}
              />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
