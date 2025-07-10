import { Form, Input } from "antd";
import React from "react";

function AntFormInput({
  label,
  name,
  disabled = false,
  placeholder,
  rules,
  addonBefore = "",
  type = "text",
  isUpperCase,
}) {
  return (
    <>
      <Form.Item
        label={label}
        style={{ margin: "0px 0px 10px 0px", display: "block" }}
        name={name}
        className={` dark-input-login`}
        rules={rules}
      >
        <Input
          onInput={(e) => {
            if (isUpperCase) {
              e.target.value = e.target.value.toUpperCase();
            } else {
              return e.target.value;
            }
          }}
          disabled={disabled}
          addonBefore={addonBefore}
          type={type}
          className={`w-100 h-40px auth-form-input  ${"bg-dark-gray email-input-login-page"}`}
          placeholder={placeholder}
        />
      </Form.Item>
    </>
  );
}

export default AntFormInput;
