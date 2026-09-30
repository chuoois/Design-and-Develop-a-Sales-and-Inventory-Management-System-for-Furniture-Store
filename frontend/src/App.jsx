import { RouterProvider } from "react-router-dom";
import { router } from "./apps/AppRouter";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
};