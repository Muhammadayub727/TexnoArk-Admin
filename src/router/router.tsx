// import {
//     createBrowserRouter,
//     createRoutesFromElements,
//     Route,
//     RouterProvider,
// } from "react-router-dom";

// import App from "../App";
// import {SignIn, SignUP, Error, Main,  Category,Product, Brand } from "@pages"

// const index = ()=>{
//     const router = createBrowserRouter(
//         createRoutesFromElements(
//             <Route path="/" element={<App />}>
//                 <Route index element={<SignIn />} />
//                 <Route path="/signup" element={<SignUP />} />
//                 <Route path="/main/*" element={<Main />} >
//                     <Route index element={<Category />} />
//                     <Route path="*" element={<Error />} />
//                     <Route path="/product" element={<Product />} />
//                     <Route path="/brand" element={<Brand />} />
//                 </Route>
//                 <Route path="*" element={<Error />} />
                
//             </Route>
//             )
//         );
//         return <RouterProvider router={router} />;
// }

// export default index;
import React from "react";
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';



interface Route {
    path: string;
    content: string;
    icon: React.ReactElement;
}

export const routes: Route[] = [
    {
        path: "/main",
        content: "Category",
        icon: <CategoryIcon/>
    },
    {
        path: "/main/products",
        content: "Products",
        icon: <DashboardCustomizeRoundedIcon/>
    },
    {
        path: "/main/brand",
        content: "Brand",
        icon: <GroupIcon/>
    },
]

export default routes