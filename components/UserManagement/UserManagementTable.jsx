import React, { useMemo, useState } from "react";
import CustomTable from "../CustomTable";
import CustomPagination from "../CustomPagination";
import Link from "next/link";
import Image from "next/image";
import styles from "./User.module.css";

function UserManagementTable({ userList, setDeleteModal, isLoading }) {
  const tableColumnData = [
    {
      title: "Username",
      apiKey: "username",
      returnText: (text) => text,
    },
    {
      title: "Name",
      apiKey: "Name",

      returnText: (text) => text,
    },
    {
      title: "Email",
      apiKey: "email",
      returnText: (text) => text,
    },
    {
      title: "Role",
      apiKey: "role",
      returnText: (text) =>
        `${text[0].toUpperCase() + text.slice(1)}
        
        `,
    },
  ];

  const stockTableData = useMemo(() => {
    const resp = tableColumnData?.map((data, i) => {
      return {
        title: <p className="">{data.title}</p>,
        dataIndex: data.apiKey,
        width: "10px",
        render(text, record) {
          console.log(record, "records");

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
                {data.title === "Username" ? (
                  <div className={styles.flex}>
                    <Image
                      width={40}
                      height={40}
                      src={
                        record?.profile_pic === null
                          ? "https://lh5.googleusercontent.com/-x2fz1GqU8mM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckkT0hcfR-U3QXaaisCSDHalmqtEg/photo.jpg"
                          : record?.profile_pic
                      }
                      alt="Image"
                    />
                    <div>
                      <p className={styles.title}>
                        {data.returnText(text, record)}
                      </p>
                      <div className={styles.flex}>
                        <Link
                          href={`/user-management/edit/${record?.id}`}
                          state={{ data: { ...record } }}
                          className="ff-lato pointer underline"
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Edit
                        </Link>
                        <span
                          className="ff-lato pointer underline"
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "white",
                          }}
                          onClick={() => setDeleteModal(record.id)}
                        >
                          Send password reset
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  data.returnText(text, record)
                )}
              </span>
            ),
          };
        },
      };
    });
    return resp;
  }, []);

  return (
    <div>
      <div className={`custom-antd-head-dark`}>
        <CustomTable
          loading={isLoading}
          data={userList?.results}
          columns={stockTableData}
          scrollable={true}
          scrollLimit={400}
        />
      </div>
    </div>
  );
}

export default UserManagementTable;
