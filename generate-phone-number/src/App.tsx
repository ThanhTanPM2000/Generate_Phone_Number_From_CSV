import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts";
import { NotFound, SignIn } from "./pages";
import { AdminRoutes, PrivateRoute } from "./routes";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
}

export default App;
