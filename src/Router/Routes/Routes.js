import { createBrowserRouter } from "react-router-dom";
import Banner from "../../Components/Pages/Front Page/Banner";
import CreateAccount from "../../Components/Pages/CreateAccount/CreateAccount";
import Main from "../../Layout/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Banner></Banner>
            },
            {
                path: '/register',
                element: <CreateAccount></CreateAccount>
            }
        ]
    }

])