import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layout/Default";

const router = createBrowserRouter([
    {
        element: <DefaultLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
])

export { router }