import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("performance_access_token");

  if (accessToken) {
    redirect("/dashboard");
  }

  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
