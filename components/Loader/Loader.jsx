"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton, Spin } from "antd";
import React from "react";
function DotLoader({ loaderData }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

  return (
    <>
      <div
      // style={{
      //   width: "100%",
      //   height: "100vh",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   backgroundColor: "#222323",
      // }}
      >
        {/* <script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"
        ></script>

        <dotlottie-player
          src="https://lottie.host/e9306afb-fcb3-4acf-a8fd-43f5135f803f/P6515YnbYr.json"
          background="transparent"
          speed="1"
          style={{
            width: "500px",
            height: "500px",
            direction: "1",
            playMode: "normal",
          }}
          loop
          autoplay
        ></dotlottie-player> */}

        <Spin
          indicator={antIcon}
          tip="Loading leads..."
          style={{ color: "white", marginTop: "20vh" }}
        />
      </div>
    </>
  );
}

export default DotLoader;
