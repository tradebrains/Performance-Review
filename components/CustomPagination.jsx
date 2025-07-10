import { Pagination } from "antd";
import React from "react";

function CustomPagination({
  showQuickJumper,
  total,
  onChange,
  onShowSizeChange,
  pageSize,
  current,
}) {
  return (
    <div
      className={`${"index-page-pagination"} w-100 d-flex  justify-content-end mt-10 pb-30`}
    >
      <Pagination
        current={current}
        showQuickJumper={showQuickJumper}
        defaultCurrent={1}
        size="small"
        total={total}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        pageSize={pageSize ?? 10}
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            return <button className="custom-pagination-btn">Prev</button>;
          }
          if (type === "next") {
            return <button className="custom-pagination-btn">Next</button>;
          }
          return originalElement;
        }}
      />
    </div>
  );
}

export default CustomPagination;
