import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import { Toaster } from "react-hot-toast";
import AdminRoute from "./routes/AdminRoute";
import { routes } from "./routes/routes";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            {routes.public.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route element={<UserLayout />}>
            {routes.user.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>

          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              {routes.admin.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
