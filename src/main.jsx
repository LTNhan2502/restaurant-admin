import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/auth/register.jsx";
import ManageUsers from "./pages/users/users.jsx";
import HomePage from "./pages/main/home.jsx";
import LoginPage from "./pages/auth/login.jsx";
import {AuthWrapper} from "./components/library/admin.context.jsx";
import ManageHotPot from "./pages/products/hotpot.jsx";
import ManageSpicyNoodles from "./pages/products/spicyNoodles.jsx";
import ManageMaterials from "./pages/products/materials.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },

            {
                path: 'hot-pot',
                element: <ManageHotPot />,
            },

            {
                path: 'spicy-noodles',
                element: <ManageSpicyNoodles />,
            },

            {
                path: 'materials',
                element: <ManageMaterials />,
            },

            {
                path: 'users',
                element: <ManageUsers />,
            },
        ]
    },

    {
        path: 'login',
        element: <LoginPage />,
    },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
  </StrictMode>,
)
