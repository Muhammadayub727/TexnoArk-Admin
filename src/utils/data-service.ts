import Cookies from "js-cookie";

export const getDataFromCookie = (title: string) => {
    return Cookies.get(title);
}

export const setDataToCookie = (title: string, data: string) => {
    Cookies.set(title, data);
}

export const removeDataFromCookie = (title: string) => {
    Cookies.remove(title);
}