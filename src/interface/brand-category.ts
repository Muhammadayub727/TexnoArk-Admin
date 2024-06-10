import request from "../service/config"

export interface postData{
    name: string;
    brand_id?:number;
}

export interface UpdateData{
    id:string;
    putData: postData;
}

export interface getBrand{
    search?: string;
    page?:number;
    limit?:number;
}

export interface GetCategoryBrandId{
    id:number;
    limit?:number;
    page?:number;
}


interface BrandCatigorty{
    get : (data:getBrand)=> any,
    post : (data:any)=> any,
    delete : (id:string)=> any,
    update : (data:UpdateData)=> any,
    getCategoryBrandId:(data:GetCategoryBrandId)=>any,
}

export interface StoreBrandCategory {
    isLoader:boolean;
    dataBrandsCategory:any[];
    dataBrandCategoryId:any[];
    totlCount:number;
    totlCountBrandCategory:number;
    getBrandCategory: (data:getBrand)=> Promise <any>;
    postBrandCategory: (data:any)=> Promise <any>;
    deleteBrandCategory: (id:string)=> Promise <any>;
    updateBrandCategory: (data:UpdateData)=> Promise <any>;
    getCategoryBrandId: (data:GetCategoryBrandId)=> Promise <any>;
}




export const brandCategory:BrandCatigorty = {
    get: (data)=> request.get(`/brand-category/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    post: (data)=> request.post("/brand-category/create" , data),
    delete: (id)=> request.delete(`/brand-category/delete/${id}`),
    update: (data)=> request.patch(`/brand-category/update/${data.id}`, data.putData),
    getCategoryBrandId: (data)=> request.get(`/brand-category/brand/${data?.id}?limit=${data?.limit}&page=${data?.page}`),
}