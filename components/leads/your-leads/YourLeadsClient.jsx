"use client";

import React, { useEffect, useState } from "react";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import {
  changeLeadStatus,
  getAllLeads,
  getAllStockDetails,
  getYourLeads,
} from "@/api/fetchClient";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination"; // ✅ Import your component
import styles from "./main.module.css";
import { DatePicker, Dropdown, Input, Menu, Select, Spin } from "antd";
import { useRouter } from "next/navigation";
import svgSheet from "@/assets/svgSheets";
import toast from "react-hot-toast";

const { Option } = Select;
const { RangePicker } = DatePicker;

//   total_items: 252774,
//   total_pages: 50555,
//   current_page: 1,
//   page_size: 5,
//   results: [
//     {
//       id: 13,
//       name: "Maulika Lisa",
//       email: "maulika.lisa@tradebrains.in",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-09T13:54:55.002161Z",
//       assigned_to: null,
//     },
//     {
//       id: 15,
//       name: "Suman Sinha",
//       email: "suman.sinha.nandan@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: "2021-07-09T14:42:40.371280Z",
//       signup_date: "2020-06-12T07:08:29.594395Z",
//       assigned_to: null,
//     },
//     {
//       id: 17,
//       name: "Aron Vaxy",
//       email: "aron.almeida1@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T06:42:48.884067Z",
//       assigned_to: null,
//     },
//     {
//       id: 18,
//       name: "Arvind Chandrashekar",
//       email: "don.osiris@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T08:16:22.978024Z",
//       assigned_to: null,
//     },
//     {
//       id: 19,
//       name: "Chhavi Kardam",
//       email: "chhavikardam16@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T08:27:08.083561Z",
//       assigned_to: null,
//     },
//     {
//       id: 13,
//       name: "Maulika Lisa",
//       email: "maulika.lisa@tradebrains.in",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-09T13:54:55.002161Z",
//       assigned_to: null,
//     },
//     {
//       id: 15,
//       name: "Suman Sinha",
//       email: "suman.sinha.nandan@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: "2021-07-09T14:42:40.371280Z",
//       signup_date: "2020-06-12T07:08:29.594395Z",
//       assigned_to: null,
//     },
//     {
//       id: 17,
//       name: "Aron Vaxy",
//       email: "aron.almeida1@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T06:42:48.884067Z",
//       assigned_to: null,
//     },
//     {
//       id: 18,
//       name: "Arvind Chandrashekar",
//       email: "don.osiris@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T08:16:22.978024Z",
//       assigned_to: null,
//     },
//     {
//       id: 19,
//       name: "Chhavi Kardam",
//       email: "chhavikardam16@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T08:27:08.083561Z",
//       assigned_to: null,
//     },
//     {
//       id: 13,
//       name: "Maulika Lisa",
//       email: "maulika.lisa@tradebrains.in",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-09T13:54:55.002161Z",
//       assigned_to: null,
//     },
//     {
//       id: 15,
//       name: "Suman Sinha",
//       email: "suman.sinha.nandan@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: "2021-07-09T14:42:40.371280Z",
//       signup_date: "2020-06-12T07:08:29.594395Z",
//       assigned_to: null,
//     },
//     {
//       id: 17,
//       name: "Aron Vaxy",
//       email: "aron.almeida1@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T06:42:48.884067Z",
//       assigned_to: null,
//     },
//     {
//       id: 18,
//       name: "Arvind Chandrashekar",
//       email: "don.osiris@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T08:16:22.978024Z",
//       assigned_to: null,
//     },
//     {
//       id: 19,
//       name: "Chhavi Kardam",
//       email: "chhavikardam16@gmail.com",
//       phone: null,
//       is_premium: false,
//       purchased_date: null,
//       signup_date: "2020-06-17T08:27:08.083561Z",
//       assigned_to: null,
//     },
//   ],
// };

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const leadStatusOptions = {
  "No Response": "no_response",
  "Call Back": "call_back",
  "Not Interested": "not_interested",
  Purchased: "purchased",
};

const statusToLabel = Object.fromEntries(
  Object.entries(leadStatusOptions).map(([label, value]) => [value, label])
);

function YourLeadsClient() {
  const [TableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [dateRange, setDateRange] = useState(null);
  const [granularity, setGranularity] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
  });
  const [loading, setLoading] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      let payload = {
        page: pagination.current,
        page_size: pagination.size,
      };

      // Apply mutually exclusive filters
      if (dateRange?.[0] && dateRange?.[1] && !granularity) {
        payload.start_date = dateRange[0].format("YYYY-MM-DD");
        payload.end_date = dateRange[1].format("YYYY-MM-DD");
      } else if (granularity && (!dateRange?.[0] || !dateRange?.[1])) {
        payload.frequency = granularity;
      }

      try {
        const res = await getYourLeads(payload);
        setTableData(res?.data?.results || []);
        setTotalItems(res?.data?.total_items || 0);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false); // ✅ stop loader no matter what
      }
    };

    fetchTableData();
  }, [pagination, dateRange, granularity]);

  // Reset pagination on filter change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, [dateRange, granularity]);

  const getColumnWidth = (title) => {
    const widths = {
      Name: 120,
      Email: 150,
      "Mobile No.": 100,
      Premium: 50,
      "Purchase Date": 100,
    };
    return widths[title] ?? 100; // fallback width
  };

  const getDataIndex = (title) => {
    const dataIndexes = {
      Name: "name",
      Email: "email",
      "Mobile No.": "phone",
      KYC: "is_premium",
      Premium: "is_premium",
      "Purchase Date": "purchased_date",
    };
    return dataIndexes[title];
  };

  const handleStatus = async (id, newStatus) => {
    // Store the previous state
    const prevData = [...TableData];

    // Optimistically update UI
    setTableData((prev) =>
      prev.map((lead) =>
        lead.lead_id === id
          ? {
              ...lead,
              status: leadStatusOptions[newStatus],
            }
          : lead
      )
    );

    try {
      const payload = {
        lead_id: id,
        status: leadStatusOptions[newStatus],
      };

      const res = await changeLeadStatus(payload);

      toast.success("Lead status updated", {
        icon: svgSheet.doubleTickToast,
        style: {
          borderRadius: "10px",
          background: "#1d3b2a", // ✅ dark green tone for success
          color: "#fff",
          fontSize: "14px",
        },
      });
    } catch (err) {
      // ❌ Revert UI if API call fails
      setTableData(prevData);

      toast.error(err?.response?.data?.error, {
        style: {
          borderRadius: "10px",
          background: "#441212",
          color: "#fff",
          fontSize: "14px",
        },
      });

      console.error("Status update failed:", err);
    }
  };

  const columnData = [
    {
      title: <p>Signup Date</p>,
      key: "date",
      fixed: "left",
      width: "100px",
      dataIndex: "signup_date",
      render(text, record, index) {
        return {
          props: {
            style: {
              background: "#1e1e1e",
              borderRight: "1px solid #2f2f2f",
              borderLeft: "1px solid #2f2f2f",
              borderBottom: "none",
            },
          },
          children: (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
                fontFamily: "var(--font-lato)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {formatDate(text)}
            </span>
          ),
        };
      },
    },
    ...["Name", "Email", "Mobile No.", "Premium", "Purchase Date"].map(
      (title) => ({
        title: (
          <span
            style={{
              border: "none !important",
            }}
          >
            {title}
          </span>
        ),
        dataIndex: getDataIndex(title),
        width: getColumnWidth(title),
        render(text) {
          return {
            props: {
              style: {
                background: "#1e1e1e",
                borderRight: "1px solid #2f2f2f",
                borderLeft: "1px solid #2f2f2f",
                borderBottom: "none",
              },
            },
            children: (
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "white",
                  textAlign:
                    title === "Premium" || title === "Purchase Date"
                      ? "center"
                      : "left",
                }}
              >
                {title === "Purchase Date" && (
                  <span
                    style={{
                      fontFamily: "var(--font-lato)",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {formatDate(text)}
                  </span>
                )}
                {title === "Name" && text}
                {title === "Email" && (
                  <span
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1, // ✅ Number of lines to show
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {text}
                  </span>
                )}
                {title === "Mobile No." && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-lato) !important",
                    }}
                  >
                    {text?.replace("+91", "") || "-"}
                  </span>
                )}

                {title === "Premium"
                  ? text === true
                    ? svgSheet.successTickIcon
                    : svgSheet.errorCrossIcon
                  : ""}
              </div>
            ),
          };
        },
      })
    ),
    {
      title: <p>Assigned To</p>,
      dataIndex: "assigned_to",
      width: "110px",
      render(text, record) {
        return {
          props: {
            style: {
              background: "#1e1e1e",
              borderRight: "1px solid #2f2f2f",
              borderLeft: "1px solid #2f2f2f",
              borderBottom: "none",
            },
          },
          children: (
            <div
              style={{
                textAlign: "center",
              }}
            >
              {record.assigned_to}
            </div>
          ),
        };
      },
    },
    {
      title: <p>Status</p>,
      dataIndex: "status",
      width: "120px",
      render(text, record) {
        const menu = (
          <Menu
            // popupClassName="assign-dropdown-menu"
            style={{
              backgroundColor: "#2d2d2d", // dark background
              color: "white", // white text
              borderRadius: "6px",
              padding: "4px 0",
            }}
            items={[
              "Purchased",
              "Not Interested",
              "No Response",
              "Call Back",
            ].map((status, index) => ({
              key: `assign-${index}`,
              label: (
                <span
                  style={{ color: "white" }}
                  onClick={() => handleStatus(record.lead_id, status)}
                >
                  {status}
                </span>
              ),
            }))}
          />
        );

        return {
          props: {
            style: {
              background: "#1e1e1e",
              borderRight: "1px solid #2f2f2f",
              borderLeft: "1px solid #2f2f2f",
              borderBottom: "none",
            },
          },
          children: (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottom"
              placeholder="Select"
            >
              <div
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#2d2d2d",
                  border: "1px solid #444",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {record.status !== "new"
                    ? statusToLabel[record.status]
                    : "Set Status"}
                </span>
                <DownOutlined style={{ fontSize: "12px", color: "#aaa" }} />
              </div>
            </Dropdown>
          ),
        };
      },
    },
  ];

  return (
    <div className="my-body px-30-0">
      <div className={styles.flex_search_button}>
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <RangePicker
            picker="month"
            format="MMM YYYY"
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            className="timebar-picker"
          />

          <Select
            value={granularity}
            placeholder="Select Frequency"
            onChange={(value) => setGranularity(value)}
            style={{
              width: 170,
              backgroundColor: "#2d2d2d",
              borderColor: "#3a3a3a",
              color: "white",
              borderRadius: "6px",
              fontFamily: "Poppins",
              fontSize: "12px !important",
            }}
            dropdownStyle={{
              backgroundColor: "#2d2d2d",
              color: "white",
              fontSize: "12px !important",
            }}
            className="timebar-select"
            popupClassName="timebar-select-popup"
          >
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
          </Select>
        </div>
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
          <CustomTable
            className="custom-ant-table"
            columns={columnData}
            data={TableData}
          />
        </div>

        <CustomPagination
          total={totalItems}
          current={pagination.current}
          pageSize={pagination.size}
          onChange={(page) =>
            setPagination((prev) => ({ ...prev, current: page }))
          }
          onShowSizeChange={(current, size) =>
            setPagination({ current: 1, size })
          }
        />
      </div>
    </div>
  );
}

export default YourLeadsClient;
