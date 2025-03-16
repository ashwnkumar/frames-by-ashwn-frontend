import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import { Toaster } from "react-hot-toast";

import { routes } from "./routes/routes";
import Loader from "./components/Loader";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.public.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route element={<UserLayout />}>
            {routes.user.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            {routes.admin[0].children.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Loader />
      <Toaster />
    </>
  );
};

export default App;
