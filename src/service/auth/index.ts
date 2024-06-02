import request from "../config";
import { Request } from "../../interface/auth";


const auth:Request = {
    sign_up:(data) => request.post("api/admin/create", data),
    sign_in: (data)=> request.post("/api/admin/login",data),

}

export default auth