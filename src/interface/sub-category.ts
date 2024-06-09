import request from "../service/config"

export interface postCategory{
    name: string, 
    parent_category_id:number,
}

export interface UpdateCategory {
    id:string;
    updateData : postCategory
}

export interface GetCategory{
    id?:number;
    search?: string,
    page?:number;
    limit?:number;
}




interface SubCategory{
    getSubCatigory : (data:GetCategory)=> any,
    postSubCatigory : (data:postCategory)=> any,
    deleteSubCatigory : (id:number)=> any,
    updateSubCatigory : (data:UpdateCategory)=> any,
}

export interface StoreSubCategory {
    isLoader:boolean;
    dataSubCatigory:any[];
    totlCount:number;
    getDataSubCatigory: (data:GetCategory)=> Promise <any>;
    postDataSubCatigory: (data:postCategory)=> Promise <any>;
    deleteDataSubCatigory: (id:number)=> Promise <any>;
    updateDataSubCatigory: (data:UpdateCategory)=> Promise <any>;
}




export const subCategory:SubCategory = {
    getSubCatigory: (data)=> request.get(`/sub-category/search/${data?.id}?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    deleteSubCatigory: (id)=> request.delete(`/sub-category/delete/${id}`),
    postSubCatigory: (data)=> request.post("/sub-category/create" , data),
    updateSubCatigory: (data)=> request.patch(`/sub-category/update/${data.id}`, data.updateData),
}