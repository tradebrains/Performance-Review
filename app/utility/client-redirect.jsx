// components/ProtectedRoute.jsx
"use client";

import { useEffect } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const accessToken = cookie.get("performance_access_token");
  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
