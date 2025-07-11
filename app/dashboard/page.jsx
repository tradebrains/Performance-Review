"use client";

import React, { useEffect } from "react";
import ProtectedRoute from "../utility/client-redirect";
import { getSearchData } from "@/api/fetchClient";

function Dashboard() {
  useEffect(() => {
    // getSearch();
  }, []);

  return (
    <ProtectedRoute>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        Dashboard
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
