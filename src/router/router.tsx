
import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GrainIcon from '@mui/icons-material/Grain';
import AppleIcon from '@mui/icons-material/Apple';



interface Route {
    path: string;
    content: string;
    icon: React.ReactElement;
}

export const routes: Route[] = [
    {
        path: "/main",
        content: "Category",
        icon: <GrainIcon/>
    },
    {
        path: "/main/products",
        content: "Products",
        icon: <ShoppingBagIcon/>
    },
    {
        path: "/main/brand",
        content: "Brand",
        icon: <AppleIcon/>
    },
]

export default routes