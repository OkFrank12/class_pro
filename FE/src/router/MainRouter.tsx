import { createBrowserRouter } from "react-router-dom";
import LayOut from "../components/common/LayOut";
import HomePage from "../pages/screen/HomePage";
import RegisterPage from "../pages/auth/RegisterPage";
import SignInPage from "../pages/auth/SignInPage";

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/:token/verify",
    element: <SignInPage />,
  },
]);
