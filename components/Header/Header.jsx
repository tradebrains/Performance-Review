"use client";
import React, { use } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authStore, setAuth } from "@/redux/reducer/authSlice";
import { Avatar, Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const listedName =
    pathname?.split("/").pop() === "dashboard"
      ? "Dashboard"
      : pathname?.split("/").pop() === "user-list"
      ? "User List"
      : pathname.includes("user-management/edit/")
      ? "User Management Edit"
      : pathname.includes("superstar/edit/")
      ? "Superstar Portfolio Edit"
      : pathname.includes("affiliate")
      ? "Affiliate"
      : pathname.includes("stock-details/create")
      ? "Stock Details Create"
      : pathname.includes("stock-details/edit")
      ? "Stock Details Edit"
      : "";

  const userData = useSelector(authStore);
  const userName = userData?.userData?.username || "User";

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const userLogout = () => {
    window.location.href = "/";
    Cookies.remove("performance_access_token");
    Cookies.remove("admin_login_session");
    Cookies.remove("admin_user_data");
    dispatch(setAuth({}));
  };

  const menu = {
    items: [
      {
        key: "2",
        label: (
          <div className="fs-s-14 fw-500 flex" onClick={userLogout}>
            <LogoutOutlined className="mx-10" style={{ fontSize: "23px" }} />
            <span>Logout</span>
          </div>
        ),
        className: "ff-poppins menu-DropDwon-dark bg-dark-black", // move className here
        style: { width: "100px", height: "auto" }, // and style too
      },
    ],
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{listedName}</h1>

        <div className={styles.controls}>
          <div className={styles.adminContainer}>
            <span className={styles.name}>{userName}</span>
            <Dropdown
              menu={{
                items: menu.items,
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Avatar
                className={styles.image_container}
                style={{
                  backgroundColor: getRandomColor(),
                }}
              >
                {userName.slice(0, 1)}
              </Avatar>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
