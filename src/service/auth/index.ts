import request from "../config";
import { Request } from "../../interface/auth";


const auth:Request = {
    sign_up:(data) => request.post("api/admin/create", data),
    sign_in: (data)=> request.post("/api/admin/login",data),
    admin_id:(id) => request.get(`/api/admin/${id}`),
    delete_admin: (id)=> request.delete(`/api/admin/${id}`),
    edit_admin: (data)=> request.put(`/api/admin/${data.id}`, data.updateData),

}

export default auth