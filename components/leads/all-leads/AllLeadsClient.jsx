"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAllLeads, getSalesPeople, postAssignLead } from "@/api/fetchClient";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import styles from "./main.module.css";
import { AutoComplete, DatePicker, Dropdown, Select, Spin } from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import moment from "moment";

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

function AllLeadsClient() {
  const router = useRouter();

  // Data and filter states
  const [TableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [dateRange, setDateRange] = useState(null);
  const [granularity, setGranularity] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
  });
  const [loading, setLoading] = useState(false);

  // Sales states
  const [salesPeople, setSalesPeople] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [salesLoading, setSalesLoading] = useState(false);
  const selectRef = useRef(null);

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
        const res = await getAllLeads(payload);
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

  useEffect(() => {
    const fetchSalesPeople = async () => {
      try {
        setSalesLoading(true); // 👈 optional loading state
        const res = await getSalesPeople();
        setSalesPeople(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch salespeople:", err);
      } finally {
        setSalesLoading(false);
      }
    };

    fetchSalesPeople();
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, [dateRange, granularity]);

  const handleAssignLead = async (record, salespersonId) => {
    //record.assigned_to

    const currentRow = TableData.find(
      (lead) => lead.assigned_to === record.assigned_to
    );

    console.log("currentRow", currentRow);

    if (currentRow?.assigned_to) {
      toast.error("This lead is already assigned to " + currentRow.assigned_to);
      return;
    }

    try {
      const payload = {
        sales_member_id: salespersonId,
        user_id: record.id,
      };

      // ✅ Assign lead API call
      await postAssignLead(payload);

      // ✅ Get the selected person's name
      const assignedPerson = salesPeople.find(
        (person) => person.id === salespersonId
      );

      // ✅ Update TableData to reflect the new assignment
      setTableData((prevData) =>
        prevData.map((lead) =>
          lead.id === record.id
            ? {
                ...lead,
                assigned_to: assignedPerson?.name ?? "Unassigned", // Update display field
              }
            : lead
        )
      );

      setOpenDropdownId(null); // Close dropdown
    } catch (error) {
      console.error("Failed to assign lead:", error);
    }
  };

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
      dataIndex: "name",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderCell(text),
    },
    {
      title: <p>Name</p>,
      dataIndex: "email",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p>Department</p>,
      dataIndex: "message",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Manager</p>,
      dataIndex: "created_at",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p> Rating Employee/ Manager</p>,
      dataIndex: "status",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Performance Rating</p>,
      dataIndex: "",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Action</p>,
      dataIndex: "",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
  ];

  return (
    <div className="my-body">
      <div className={styles.flex_search_button}>
        <div>Performance review</div>
        <div onClick={() => router.push("/performance-review/apply")}>
          <button className={styles.button}>Apply</button>
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

          <div>
            <CustomTable
              className="custom-ant-table"
              columns={columns}
              data={""}
            />
          </div>
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

export default AllLeadsClient;
