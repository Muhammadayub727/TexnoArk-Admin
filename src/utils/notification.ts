import { Bounce, TypeOptions, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

interface NotificationProp{
    title : string
    type : TypeOptions | undefined
}

export const Notification = (prop : NotificationProp) => {
    return toast(prop.title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition : Bounce,
        type : prop.type
    });
}