import { createBrowserRouter } from "react-router-dom";
import Banner from "../../Components/Pages/Front Page/Banner";
import CreateAccount from "../../Components/Pages/CreateAccount/CreateAccount";
import Main from "../../Layout/Main";
import SignIn from "../../Components/Pages/SignIn/SignIn";
import About from "../../Components/Pages/About/About";
import Profile from "../../Components/Pages/Profile/Profile";
import ChatBox from "../../Components/Pages/ChatBox/ChatBox/ChatBox";


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
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/chatbox',
                element: <ChatBox></ChatBox>,
                loader: () => fetch('http://localhost:5000/messages')
            }
        ]
    }

])