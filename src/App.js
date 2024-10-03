import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import UDOID from "./components/Document";
import ProfileKz from "./components/ProfileKZ";
import UsernameKz from "./components/UsernameKZ";
import PasswordKz from "./components/PasswordKZ";
import RegisterKz from "./components/RegisterKZ";
import PdfPage from "./PDFFILES/Pdf";
import RecoveryKZ from "./components/RecoveryKZ";

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/kz',
        element : <UsernameKz></UsernameKz>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/registerkz',
        element : <RegisterKz></RegisterKz>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/passwordkz',
        element : <ProtectRoute><PasswordKz /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/profilekz',
        element : <AuthorizeUser><ProfileKz /></AuthorizeUser>
    },

    {
        path : '/document',
        element : <UDOID></UDOID>
    },
    {
        path : '/Pdf',
        element : <loadCountries></loadCountries>},
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/recoverykz',
        element : <RecoveryKZ></RecoveryKZ>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
