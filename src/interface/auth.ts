export interface SignUp {
    first_name:string,
    last_name:string,
    phone_number:string,
    email:string,
    password:string,
}

export interface SignIn{
    email:string,
    password:string,
}

export interface Request{
    sign_up:(data:SignUp)=>any,
    sign_in:(data:SignIn)=>any
}