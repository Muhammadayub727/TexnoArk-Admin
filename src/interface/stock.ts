
import request from "../service/config"

export interface postData{
    quantity: number| string;
    category_id:number;
    product_id:number;
    brand_id:number;
}

export interface UpdateData{
    id:number;
    putData: postData;
}


export interface getStock{
    limit ?: number;
    page ?: number;
}


export interface ProductsId {
    [index :string] :unknown |any
}


interface Stock{
    get : (data:getStock)=> any,
    post : (data:any)=> any,
    delete : (id:string)=> any,
    update : (data:UpdateData)=> any,

    grtBrandIdStock :(id:number)=> any,

}

export interface StoreStock{
    isLoader:boolean;
    dataStock:any[];
    dataBrandIdStock:any[];
    totlCount:number;
    getStock: (dat:getStock)=> Promise <any>;
    postStock: (data:any)=> Promise <any>;
    deleteStock: (id:string)=> Promise <any>;
    updateStock: (data:UpdateData)=> Promise <any>;

    grtBrandIdStock :(id:number)=> Promise <any>;
}




export const stock:Stock = {
    get: (data)=> request.get(`/stock?limit=${data?.limit}&page=${data?.page}`),
    post: (data)=> request.post("/stock/create" , data),
    delete: (id)=> request.delete(`/stock/delete/${id}`),
    update: (data)=> request.patch(`/stock/update/${data.id}`, data.putData),

    grtBrandIdStock: (id)=> request.get(`/stock/brand/${id}`)

}