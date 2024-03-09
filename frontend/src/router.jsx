import { Navigate, createBrowserRouter } from "react-router-dom";
//admin route
import Dashboard from "./views/Admin/Dashboard.jsx";
import Users from "./views/Admin/Users";
import UserForm from "./views/Admin/UserForm.jsx";
//user
import DashboardUser from "./views/User/DashboardUser.jsx";
//components
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
//pages
import Signup from "./views/Pages/Signup";
import Login from "./views/Pages/Login";
import NotFound from "./views/Pages/NotFound.jsx";
import Home from "./views/Pages/Home.jsx";
import Contact from"./views/Pages/Contact.jsx";
import About from "./views/Pages/About.jsx";
import GuestHome from "./views/Pages/GeustHome.jsx";
const router = createBrowserRouter([

  // Routes pour GuestLayout
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/Guesthome' />
      },
      {
        path: "/Guesthome",
        element: <GuestHome />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      },


    ],
  },

  // Routes pour DefaultLayout
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      },

      {
        path: '/DashboardUser',
        element: <DashboardUser />
      },


    ]
  },

 // Routes pour AdminLayout
 {
  path: '/',
  element: <AdminLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to='/users' />
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '/users/new',
      element: <UserForm key="userCreate" />
    },
    {
      path: '/users/:id',
      element: <UserForm key="userUpdate" />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },

  ]
},

  // Route NotFound
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: '/home',
    element: <Home />
  },

]);

export default router;
