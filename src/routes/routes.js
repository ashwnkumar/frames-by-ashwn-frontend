import AdminHome from "../pages/admin/AdminHome";
import AdminLogin from "../pages/admin/AdminLogin";
import Home from "../pages/user/Home";
import Gallery from "../pages/user/Gallery";
import AdminPhotos from "../pages/admin/photos/AdminPhotos";
import AdminAlbums from "../pages/admin/albums/AdminAlbums";
import AdminLayout from "../layouts/AdminLayout"; // Import AdminLayout
import AddAlbums from "../pages/admin/albums/AddAlbums";
import PhotosForm from "../pages/admin/photos/PhotosForm";
import AdminForm from "../pages/admin/AdminForm";

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
      component: AdminLayout,
      children: [
        {
          path: "",
          component: AdminHome,
        },
        {
          path: "photos",
          component: AdminPhotos,
        },
        {
          path: "photos/add",
          component: PhotosForm,
        },
        {
          path: "photos/edit/:id",
          component: PhotosForm,
        },
        {
          path: "albums",
          component: AdminAlbums,
        },
        {
          path: "albums/add",
          component: AddAlbums,
        },
        {
          path: "edit",
          component: AdminForm,
        },
      ],
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
