import { Select } from "antd";
import React from "react";

function SelectOptions({
  data,
  setSelected,
  defaultSelect,
  width,
  placeholder,
}) {
  const { Option } = Select;
  const handleChange = (value) => {
    setSelected(value);
  };
  return (
    <div className="mb-10">
      <Select
        className={"br-5 antd-Selete-Custom-dark border1px-dark-mode"}
        defaultValue={defaultSelect}
        getPopupContainer={(trigger) => trigger.parentNode}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: width,
        }}
      >
        {data.map((items, i) => (
          <Option key={i} value={items.value}>
            {items.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectOptions;
