"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  House,
  Info,
  Mail,
  Settings,
  Menu,
  ChevronDown,
  ChevronUp,
  Gem,
  BadgeIndianRupee,
  KeyRound,
  ChartCandlestick,
  MessageCircleCode,
  BellDot,
  UserCheck,
  Activity,
  PaintBucket,
  SprayCan,
  ContactRound,
  UsersRound,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const ICONS = {
  Users,
  House,
  Info,
  Mail,
  Settings,
  Gem,
  BadgeIndianRupee,
  KeyRound,
  ChartCandlestick,
  MessageCircleCode,
  BellDot,
  UserCheck,
  Activity,
  PaintBucket,
  SprayCan,
  ContactRound,
  UsersRound,
  UserRound,
};

const Sidebar = ({ isMobile, isOpen }) => {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const sideBarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "House",
    },
    {
      name: "Performance Review",
      href: "/performance-review",
      icon: "UsersRound",
    },
    {
      name: "Announcements",
      href: "/announcements",
      icon: "UserRound",
    },
    {
      name: "User List",
      href: "/user-list",
      icon: "UserRound",
    },
  ];

  const isSidebarExpanded = isMobile ? isOpen : isDesktopOpen;

  return (
    <div
      className={`sidebar ${
        isMobile ? (isOpen ? "sidebar-open" : "sidebar-closed") : ""
      } ${styles.sidebarContainer} ${
        isSidebarExpanded ? styles.sidebarOpen : styles.sidebarClosed
      } ${isMobile ? styles.sidebarMobile : ""}`}
    >
      <div className={styles.sidebarInner}>
        {!isMobile && (
          <button
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className={styles.toggleButton}
          >
            <Menu size={24} style={{ color: "white" }} />
          </button>
        )}

        <nav className={styles.navContainer}>
          {sideBarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive =
              pathname === item.href ||
              item.subItems?.some((sub) => pathname === sub.href);

            return (
              <div key={item.name}>
                <div
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      handleDropdownToggle(item.name);
                    } else {
                      if (document.startViewTransition) {
                        document.startViewTransition(() => {
                          router.push(item.href);
                        });
                      } else {
                        router.push(item.href);
                      }
                    }
                  }}
                >
                  <IconComponent
                    size={20}
                    style={{ minWidth: "20px", color: "white" }}
                  />

                  {isSidebarExpanded && (
                    <span className={styles.navText}>
                      {item.name}{" "}
                      {item.hasDropdown && (
                        <span className={styles.dropdown_icon}>
                          {openDropdown ? <ChevronUp /> : <ChevronDown />}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {item.hasDropdown &&
                  openDropdown === item.name &&
                  isSidebarExpanded && (
                    <div className={styles.dropdownContainer}>
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.name}
                          className={`${styles.navItem} ${
                            pathname === subItem.href
                              ? styles.navItemActive
                              : ""
                          }`}
                          onClick={() => router.push(subItem.href)}
                        >
                          <span
                            className={styles.navText}
                            style={{ paddingLeft: "30px" }}
                          >
                            {subItem.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
