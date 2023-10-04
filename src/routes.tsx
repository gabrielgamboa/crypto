import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layout/Default";
import { Detail } from "./pages/Detail";
import { NotFound } from "./pages/errors/notfound";

const router = createBrowserRouter([
  {
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/details/:symbol",
        element: <Detail/>
      },
      { 
        path: "*",
        element: <NotFound/>
      }
    ]
  }
])

export { router }