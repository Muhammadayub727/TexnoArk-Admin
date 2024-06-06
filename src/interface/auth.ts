
export interface Signin{
    phone_number:string,
    password: string;
}

export interface Signup{
    first_name: string;
    last_name: string;
    phone_number: string;
    email:string,
    password:string
}

export interface AdminUpdate {
    id : number;
    updateData: Signup;
}


export interface Request{
    signin:(data:Signin)=>any,
    signup:(data:Signup)=>any,
    logout: () => void;
    getAdminId: (id:number) => any;
    deleteAdminId: (id:number) => any;
    updateAdminId: (data:AdminUpdate) => any;
}