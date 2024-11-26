import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/register.jsx";
import ManageUsers from "./pages/users.jsx";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import {AuthWrapper} from "./components/library/admin.context.jsx";

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
