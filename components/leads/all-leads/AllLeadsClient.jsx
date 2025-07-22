"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  getManagersList,
  getPerformanceData,
  getStatus,
} from "@/api/fetchClient";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import styles from "./main.module.css";
import {
  AutoComplete,
  DatePicker,
  Dropdown,
  Popover,
  Select,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import moment from "moment";
import { MoreOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { authStore } from "@/redux/reducer/authSlice";
import { employeeStore } from "@/redux/reducer/employeeSlice";

const { Option } = Select;
const { RangePicker } = DatePicker;

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function PerformanceReview() {
  const router = useRouter();
  const [managers, setManagers] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
  });
  const [loading, setLoading] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      try {
        const res = await getPerformanceData();
        setTableData(res?.data);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

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

  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const resp = await getStatus();
        if (resp?.status === 200) {
          setStatus(resp?.data);
        } else {
        }
      } catch (error) {}
    };
    fetchStatus();
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
      title: <span>Date </span>,
      dataIndex: "date",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderCell(new Date(text).toLocaleDateString()),
    },
    {
      title: <p>Name</p>,
      dataIndex: "employee_name",
      width: "50px",
      render: (text, record) => renderCell(text || "-"),
    },
    {
      title: <p>Department</p>,
      dataIndex: "department",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Manager</p>,
      dataIndex: "supervisor",
      width: "50px",
      render: (text) => {
        const foundManager = managers?.find((m) => m.id == text);

        return renderCell(foundManager?.name || "");
      },
    },
    {
      title: <p>Rating (Emp/Mgr)</p>,
      dataIndex: "sections",
      width: "150px",
      render: (_, record) => {
        const sections = record?.sections || {};
        const employeeSum = Object.values(sections).reduce(
          (acc, s) => acc + (s?.employeeRating || 0),
          0
        );
        const managerSum = Object.values(sections).reduce(
          (acc, s) => acc + (s?.managerRating || 0),
          0
        );
        return renderCell(`${employeeSum} / ${managerSum}`);
      },
    },
    {
      title: <p>Performance Rating</p>,
      dataIndex: "",
      width: "120px",
      render: (_, record) => {
        const sections = record?.sections || {};
        const managerSum = Object.values(sections).reduce(
          (acc, s) => acc + (s?.managerRating || 0),
          0
        );
        let rating = "N/A";
        if (managerSum >= 45) {
          rating = "Exceeded";
        } else if (managerSum >= 30) {
          rating = "Met Expectations";
        } else if (managerSum > 25) {
          rating = "Below Expectations";
        }

        return renderCell(rating);
      },
    },
    {
      title: <p>Status</p>,
      dataIndex: "status",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p>Action</p>,
      dataIndex: "",
      width: "50px",
      render(text, record) {
        return {
          props: {
            style: {
              ...baseCellStyle,
            },
          },
          children: (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
              }}
            >
              <Popover
                //  key={key}
                color={"#2f2f2f"}
                className={`nameis fs-s-20 `}
                openClassName=""
                overlayClassName="Nopadding-pover"
                placement="Right"
                style={{ width: "10px", height: "30px" }}
                content={
                  <div className="">
                    <div className={`text-white`}>
                      <div
                        onClick={() => {
                          router.push(
                            `/performance-review/apply?employeeId=${record?.id}`
                          );
                        }}
                      >
                        <p className={styles.edit}>Edit</p>
                      </div>
                    </div>
                  </div>
                }
              >
                <p className="mb-0">
                  <MoreOutlined />
                </p>
              </Popover>
            </span>
          ),
        };
      },
    },
  ];

  const statusCheck =
    status[0]?.status === "Draft" || status[0]?.status === "Submitted";

  return (
    <div className="my-body">
      <div className={styles.flex_search_button}>
        <div>Performance review</div>
        {!statusCheck && (
          <div onClick={() => router.push("/performance-review/apply")}>
            <button className={styles.button}>Apply</button>
          </div>
        )}
      </div>

      <div className={`custom-antd-head-dark`}>
        <div className={styles.table_wrapper}>
          {loading && (
            <div className={styles.loader_overlay}>
              <span className={styles.loader_spinner}>
                <Spin size="large" tip="Loading..." />
              </span>
            </div>
          )}

          <div>
            <CustomTable
              className="custom-ant-table"
              columns={columns}
              data={TableData}
            />
          </div>
        </div>

        {/* <CustomPagination
          total={totalItems}
          current={pagination.current}
          pageSize={pagination.size}
          onChange={(page) =>
            setPagination((prev) => ({ ...prev, current: page }))
          }
          onShowSizeChange={(current, size) =>
            setPagination({ current: 1, size })
          }
        /> */}
      </div>
    </div>
  );
}

export default PerformanceReview;
