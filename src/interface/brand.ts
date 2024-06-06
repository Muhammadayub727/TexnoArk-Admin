import request from "../service/config"

export interface postData{
    name: string;
    description: string;
    category_id:any;
    file?:any;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}

export interface getBrand{
    page:number;
    limit:number;
}


interface Brand{
    get : (data:getBrand)=> any,
    
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,
}

export interface StoreBrand {
    isLoader:boolean;
    dataBrands:any[];
    totlCount:number;
    getBrand: (data:getBrand)=> Promise <any>;

    postBrand: (data:any)=> Promise <any>;
    deleteBrand: (id:number)=> Promise <any>;
    updateBrand: (data:UpdateData)=> Promise <any>;
}




export const brand:Brand = {
    get: (data)=> request.get(`/brand?limit=${data.limit}&page=${data.page}`),
    
    post: (data)=> request.post("/brand" , data),
    delete: (id)=> request.delete(`/api/brand/delete/${id}`),
    update: (data)=> request.put(`/api/brand/update/${data.id}`, data.putData)
}