import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import App from "../App";
import {SignIn, SignUP, Error, Main,  Category ,} from "@pages"

const index = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<SignIn />} />
                <Route path="/signup" element={<SignUP />} />
                <Route path="/main/*" element={<Main />} >
                    <Route index element={<Category />} />
                    <Route path="*" element={<Error />} />
                </Route>
                <Route path="*" element={<Error />} />
                
            </Route>
            )
        );
        return <RouterProvider router={router} />;
}

export default index;