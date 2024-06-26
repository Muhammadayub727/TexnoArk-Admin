
import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GrainIcon from '@mui/icons-material/Grain';
import AppleIcon from '@mui/icons-material/Apple';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';



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
    {
        path: "/main/brand-category",
        content: "Brand Category",
        icon: <KeyboardCommandKeyIcon/>
    },
    {
        path: "/main/stock",
        content: "Stock",
        icon: <Grid3x3Icon/>
    }
]

export default routes