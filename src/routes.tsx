import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { DefaultLayout } from "./layout/default";

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