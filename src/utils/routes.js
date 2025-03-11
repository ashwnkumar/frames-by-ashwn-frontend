import AdminHome from "../pages/admin/AdminHome";
import Home from "../pages/user/Home";
import Gallery from "../pages/user/Gallery";

export const routes = {
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
