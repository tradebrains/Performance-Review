"use client";
import CustomTable from "@/components/CustomTable";
import { message, Modal, Spin } from "antd";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import styles from "./leads.module.css";
import {
  getAnnouncementData,
  getAnnouncementDataId,
  postAnnouncementData,
  putAnnouncementData,
} from "@/api/fetchClient";
export default function Announcement() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [TableData, setTableData] = useState([]);
  const [Model, setModel] = useState(false);
  const [date, setDate] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationDescription, setNotificationDescription] = useState("");
  const [id, setId] = useState("");

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

  const fetchAnnouncementById = async (item) => {
    try {
      const resp = await getAnnouncementDataId(item);
      setNotificationTitle(resp?.data?.notification_title);
      setNotificationDescription(resp?.data?.notification_description);
      setDate(resp?.data?.date);
    } catch (error) {}
  };

  const postAnnouncement = async () => {
    const data = {
      notification_title: notificationTitle,
      notification_description: notificationDescription,
      notification_date: date,
    };
    if (id) {
      await putAnnouncementData(id, data).then((resp) => {
        if (resp?.status === 200) {
          setModel(false);
          message.success(resp?.data?.message);
          getAnnouncements();
          setNotificationTitle("");
          setNotificationDescription("");
          setDate("");
          setId("");
        }
      });
    } else {
      await postAnnouncementData(data).then((resp) => {
        if (resp?.status === 201) {
          setModel(false);
          message.success(resp?.data?.message);
          getAnnouncements();
          setNotificationTitle("");
          setNotificationDescription("");
          setDate("");
        }
      });
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
            <div
              onClick={() => {
                setModel(true);
                setId(record.id);
                fetchAnnouncementById(record.id);
              }}
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Pencil />
            </div>
          ),
        };
      },
    },
  ];

  return (
    <>
      <div>
        <div className="my-body">
          <div className={styles.flex_search_button}>
            <div className={styles.heading}>Announcement</div>
            <div onClick={() => setModel(true)}>
              <button className={styles.button}>Apply</button>
            </div>
          </div>

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
      </div>
      <Modal
        title={
          <p className={`${styles.Announcement_modal}`}>Add Announcement</p>
        }
        visible={Model}
        centered
        wrapClassName={"modelClassname"}
        onCancel={() => {
          setModel(false);
        }}
        footer={[
          <button
            key="submit"
            type="primary"
            onClick={postAnnouncement}
            className={styles.button}
          >
            Submit
          </button>,
        ]}
      >
        <div className={styles.modalContent}>
          <label htmlFor="" className={styles.label}>
            Notification Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            className={styles.modalInput}
          />
          <label htmlFor="" className={styles.label}>
            Date
          </label>
          <input
            name="date"
            type="date"
            value={date}
            className={styles.modalInput}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="" className={styles.label}>
            Notification Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={notificationDescription}
            onChange={(e) => setNotificationDescription(e.target.value)}
            className={styles.modalTextArea}
          />
        </div>
      </Modal>
    </>
  );
}
