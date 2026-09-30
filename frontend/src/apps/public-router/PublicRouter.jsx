import { HomeLayout } from "../../components/layouts/home-layout/HomeLayout";
import { LoginPage } from "../../pages/public-pages/LoginPage";
import { RegisterPage } from "../../pages/public-pages/RegisterPage";
import { ForgotPasswordPage } from "../../pages/public-pages/ForgotpasswordPage";

export const PublicRouter = {
  path: "/",
  element: <HomeLayout />,
  children: [
    {
      path: "home",
      element: <div>Home Content</div>,
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
    }
  ],
};