export interface SignUp {
    first_name:string,
    last_name:string,
    phone_number:string,
    email:string,
    password:string,
}

export interface SignIn{
    PhoneNumber:string,
    password:string,
}

// export interface AdminUpdate {
//     id : number;
//     updateData: SignUp;
// }


export interface Request{
    sign_up:(data:SignUp)=>any,
    sign_in:(data:SignIn)=>any,
    // admin_id:(id:number)=>any,
    // delete_admin: (id:number) => any;
    // edit_admin: (data:AdminUpdate) => any;
}