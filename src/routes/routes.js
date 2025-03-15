import AdminHome from "../pages/admin/AdminHome";
import AdminLogin from "../pages/admin/AdminLogin";
import Home from "../pages/user/Home";
import Gallery from "../pages/user/Gallery";

export const routes = {
  public: [
    {
      path: "/admin/login",
      component: AdminLogin,
    },
  ],
  admin: [
    {
      path: "/admin",
      component: AdminHome,
    },
  ],
  user: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/gallery",
      component: Gallery,
    },
  ],
  navbar: [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Gallery",
      path: "/gallery",
    },
  ],
};
