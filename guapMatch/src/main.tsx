import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./pages/authlayout/authlayout.tsx";
import { Auth } from "./pages/auth/auth.tsx";
import { Register } from "./pages/register/register.tsx";
import { Layout } from "./pages/layout/layout.tsx";
import { Form } from "./pages/Form/Form.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { Match } from "./pages/Svap/Svap.tsx";
import { Messages } from "./pages/Messages/Messages.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
import { Cover } from "./pages/Cover/Cover.tsx";
import { Filter } from "./pages/Filter/Filter.tsx";
import { Settings } from "./pages/Settings/Settings.tsx";
import { Chatroom } from "./pages/Chatroom/Chatroom.tsx";
import { Buddy } from "./pages/buddyProdile/buddyProfile.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/",
                        element: <Filter />,
                    },
                ],
            },
            {
                path: "/Match",
                element: <Match />,
                children: [
                    {
                        path: "/Match",
                        element: <Filter />,
                    },
                ],
            },
            {
                path: "/Messages",
                element: <Messages />,
            },
            {
                path: '/Buddy',
                element: <Buddy/>
            },
            {
                path: '/Chatroom',
                element:<Chatroom/>
            },
            {
                path: "/Profile",
                element: <Profile />,
            },
            {
                path: "/Settings",
                element: <Settings />,
            },
        ],
    },
    {
        path: "/form",
        element: <Form />,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "Main",
                element: <Cover />,
            },
            {
                path: "login",
                element: <Auth />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
