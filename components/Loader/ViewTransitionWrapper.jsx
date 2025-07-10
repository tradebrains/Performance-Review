"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ViewTransitionWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("href")?.startsWith("#") ||
        link.hasAttribute("data-no-transition")
      ) {
        return;
      }

      const href = link.getAttribute("href");
      const isInternal = href?.startsWith("/") && !href?.startsWith("//");

      if (!isInternal) return;

      event.preventDefault();

      if (!document.startViewTransition) {
        router.push(href);
        return;
      }

      document.startViewTransition(() => {
        router.push(href);
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return <>{children}</>;
}
