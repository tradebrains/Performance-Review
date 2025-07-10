import { Table } from "antd";
import React from "react";

function CustomTable({
  columns,
  data,
  scrollable = true,
  expandableData = null,
  loading = false,
  border,
  rowSelection = null,
  scrollLimit = null,
  sortDirections = ["ascend", "descend"],
  scrollY = null,
  size = "middle",
  className,
}) {
  return (
    <Table
      sortDirections={sortDirections}
      loading={loading}
      bordered={border}
      dataSource={data}
      columns={columns}
      scroll={{
        x: "max-content",
        y: scrollY || undefined,
      }}
      scrollable={scrollable}
      pagination={false}
      expandable={expandableData}
      className={className}
      rowClassName="table-custom"
      rowSelection={rowSelection}
      size={size}
    />
  );
}

export default CustomTable;
