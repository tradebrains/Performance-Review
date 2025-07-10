"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import AuthLayoutWrapper from "@/app/AuthLayoutWrapper";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"; // ✅ Ant icons
import { usePathname } from "next/navigation";

const MainContainer = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ Hydration guard
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ NEW state

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Auto close sidebar if resizing from mobile to desktop
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname(); // Add inside MainContainer

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false); // ✅ close on route change in mobile
    }
  }, [pathname]);

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <div className="layout-container">
      {/* Burger menu button */}
      {isMobile && !isSidebarOpen && (
        <div className="burger-icon" onClick={() => setIsSidebarOpen(true)}>
          <MenuOutlined
            style={{
              fontSize: "22px",
              color: "white",
            }}
          />
        </div>
      )}

      {/* Mobile sidebar close icon */}
      {isMobile && isSidebarOpen && (
        <div className="close-icon" onClick={() => setIsSidebarOpen(false)}>
          <CloseOutlined
            style={{
              fontSize: "22px",
              color: "white",
            }}
          />
        </div>
      )}

      {isMobile && isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="header-container">
          <Header />
          <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
