import { Pagination } from "@mui/material";
import Products from "../Products/Products";
import React from "react";

const CustomPagination = ({ handlePageChange }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Pagination count={10} onChange={(e) => handlePageChange(e)} />
    </div>
  );
};

export default CustomPagination;
