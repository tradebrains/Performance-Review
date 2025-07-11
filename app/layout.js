import "./globals.css";
import { Lato, Poppins } from "next/font/google";
import StoreProvider from "./StoreProvider";
import AuthLayout from "./AuthLayout";
import ViewTransitionWrapper from "@/components/Loader/ViewTransitionWrapper";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // or use ["variable"] if using variable font
  variable: "--font-poppins",
  display: "swap", // optional but recommended
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], // or ["variable"]
  variable: "--font-lato",
  display: "swap",
});

export const metadata = {
  title: "Performance Review",
  description: "Performance Review Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`${poppins.variable} ${lato.variable} `}>
        <StoreProvider>
          <ViewTransitionWrapper>
            <AuthLayout>{children}</AuthLayout>
          </ViewTransitionWrapper>
        </StoreProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              fontFamily: "var(--font-poppins)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
