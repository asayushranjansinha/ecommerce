import React from "react";
import Navbar from "../features/nav/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";

const AdminOrdersPage = () => {
  return (
    <Navbar>
      <AdminOrders></AdminOrders>
    </Navbar>
  );
};

export default AdminOrdersPage;
