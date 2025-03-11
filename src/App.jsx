import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { routes } from "./utils/routes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          {routes.user.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route element={<AdminLayout />}>
          {routes.admin.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
