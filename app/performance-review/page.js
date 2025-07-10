import AllLeadsClient from "@/components/leads/all-leads/AllLeadsClient";
import dynamic from "next/dynamic";

// const AllLeadsClient = dynamic(() =>
//   import("@/components/leads/all-leads/AllLeadsClient")
// );

export default function Page() {
  return <AllLeadsClient />;
}
