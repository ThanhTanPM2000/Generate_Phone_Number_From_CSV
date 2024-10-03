import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { NotFound } from "../pages";
import PhoneNumberRetrieval from "../pages/PhoneNumber/PhoneNumberRetrieval";
import SpreadsheetList from "../pages/Spreadsheet/SpreadsheetList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<PhoneNumberRetrieval />} />
        <Route path="spreadsheets" element={<SpreadsheetList />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/admin/404" />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
