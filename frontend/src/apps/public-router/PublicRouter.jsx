import { HomeLayout } from "../../components/layouts/home-layout/HomeLayout";
import { LoginPage } from "../../pages/public-pages/LoginPage";
import { RegisterPage } from "../../pages/public-pages/RegisterPage";
import { ForgotPasswordPage } from "../../pages/public-pages/ForgotpasswordPage";
import {HomePage } from "../../pages/public-pages/HomePage";
import { InteriorDesignPage } from "../../pages/public-pages/InteriorDesignPage";

export const PublicRouter = {
  path: "/",
  element: <HomeLayout />,
  children: [
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "interior-design",
      element: <InteriorDesignPage />,
    }
  ],
};