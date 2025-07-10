import React from "react";
import { Switch } from "antd";

function ValueChangeButton({ setChangePicker, changePicker }) {
  const handleChange = () => {
    return setChangePicker(!changePicker);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Switch size="small" defaultChecked onClick={() => handleChange()} />

      <p className="ml-5"> {changePicker ? "Date Wise" : "Month Wise"}</p>
    </div>
  );
}
export default ValueChangeButton;
