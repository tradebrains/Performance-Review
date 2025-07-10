import { cookies } from "next/headers";
import MainContainer from "@/components/wrappers/MainContainer";

export default function AuthLayout({ children }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("performance_access_token");

  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div>
      <MainContainer>
        <>{children}</>
      </MainContainer>
    </div>
  );
}
