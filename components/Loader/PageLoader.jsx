"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

const PageLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <Loader /> : null;
};

export default PageLoader;
