"use client";

import React, { useEffect } from "react";
import ProtectedRoute from "../utility/client-redirect";
import { getSearchData } from "@/api/fetchClient";

function Dashboard() {
  const getSearch = async (e) => {
    await getSearchData(e).then((res) => {
      console.log(res, "Search Data");
    });
  };

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
