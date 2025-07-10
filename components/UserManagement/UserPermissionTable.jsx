import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Image, message } from "antd";
import {
  getUserAccountStatus,
  putUserAccountStatus,
  putUserManagementUserData,
} from "@/api/fetchClient";
import CustomTable from "../CustomTable";
import styles from "./User.module.css";

const UserPermissionTable = ({
  pagePermission,
  onPermissionChange,
  userId,
  userData,
  getIndividualData,
}) => {
  const [updatedData, setupdatedData] = useState();
  const [updateAccountStatus, setupdateAccountStatus] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: "Permissions Updated Successfully",
    });
  };
  const tableColumnData = [
    {
      title: "Capabilities",
      apiKey: "label",
      returnText: (text) => text,
    },
    {
      title: "View",
      apiKey: "view",
      returnText: (text) => text,
    },
    {
      title: "Create",
      apiKey: "create",
      returnText: (text) => text,
    },
    {
      title: "Edit",
      apiKey: "edit",
      returnText: (text) => `${text[0].toUpperCase() + text.slice(1)}`,
    },
    {
      title: "Delete",
      apiKey: "delete",
      returnText: (text) => text,
    },
  ];

  const CapabilitiesData = [
    {
      label: "Dashboard",
      value: "dashboard",
      fields: { view: true, create: false, edit: false, delete: false },
    },
    {
      label: "Users List",
      value: "user_list",
      fields: { view: true, create: false, edit: true, delete: false },
    },
    {
      label: "Premium Support",
      value: "premium_support",
      fields: { view: true, create: false, edit: true, delete: false },
    },
    {
      label: "Bucket",
      value: "bucket",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Transaction Details",
      value: "transaction_details",
      fields: { view: true, create: false, edit: false, delete: false },
    },
    {
      label: "Coupons",
      value: "coupons",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Superstar Portfolio",
      value: "superstar_portfolio",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Superstar Portfolio 2.0",
      value: "superstar_portfolio_new",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Feedback",
      value: "feedback",
      fields: { view: true, create: false, edit: false, delete: false },
    },
    {
      label: "Notification",
      value: "notification",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Stock Details",
      value: "stock_details",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Stock Research Report",
      value: "stock_research_report",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "User Management",
      value: "user_management",
      fields: { view: true, create: true, edit: true, delete: true },
    },
    {
      label: "Affiliate",
      value: "affiliate",
      fields: { view: true, create: true, edit: true, delete: true },
    },
  ];
  const status = async () => {
    await getUserAccountStatus(userId).then((response) => {
      setupdateAccountStatus(response?.status);
    });
  };
  useEffect(() => {
    status();
  }, []);
  const onChange = (e, coloumnKey, page) => {
    const tempPagePermissions = { ...pagePermission };
    if (!e.target.checked) {
      tempPagePermissions[coloumnKey] = tempPagePermissions[coloumnKey].filter(
        (each) => each !== page
      );
    } else {
      tempPagePermissions[coloumnKey].push(page);
    }

    console.log(tempPagePermissions, "checked");
    setupdatedData({
      permissions: {
        user: tempPagePermissions?.user,
        view: tempPagePermissions?.view,
        create: tempPagePermissions?.create,
        edit: tempPagePermissions?.edit,
        delete: tempPagePermissions?.delete,
      },
    });
    onPermissionChange(tempPagePermissions);
  };
  const onSave = async () => {
    await putUserManagementUserData(updatedData).then((resp) => {
      if (resp?.status === 202 || resp?.status === 200) {
        getIndividualData();
        success();
      }
    });
  };
  const onDeactivate = async () => {
    const data = {
      email: userData?.email,
      is_active: updateAccountStatus === "Active" ? false : true,
    };
    await putUserAccountStatus(data).then((resp) => {
      if (resp?.status === 202 || resp?.status === 200) {
        status();
      }
    });
    status();
  };
  const stockTableData = useMemo(() => {
    const resp = tableColumnData?.map((data, i) => {
      return {
        title: <p className="fs-s-16 fw-600 mb-0">{data.title}</p>,
        dataIndex: data.apiKey,
        width: "10px",
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
              <span
                className="ff-lato "
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "white",
                }}
              >
                {data?.title === "Capabilities" ? (
                  <div>{text}</div>
                ) : record?.fields[data.apiKey] === true ? (
                  <Checkbox
                    checked={
                      pagePermission[data.apiKey]?.includes(record?.value)
                        ? true
                        : false
                    }
                    onChange={(e) => onChange(e, data.apiKey, record.value)}
                  ></Checkbox>
                ) : (
                  ""
                )}
              </span>
            ),
          };
        },
      };
    });
    return resp;
  }, [pagePermission]);
  return (
    <div>
      {contextHolder}
      <div className={`custom-antd-head-dark`}>
        <CustomTable
          data={CapabilitiesData}
          columns={stockTableData}
          scrollable={true}
          scrollLimit={400}
        />
      </div>
      <div className={styles.flex_button}>
        <button
          type="primary"
          className={styles.save_button}
          onClick={() => onSave()}
        >
          Save
        </button>
        <button className={styles.active_button} onClick={() => onDeactivate()}>
          {updateAccountStatus === "Active" ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
};
export default UserPermissionTable;
