import request from "../service/config"

export interface postCategory{
    category_name: string,
    parent_category_id?: number | null ,
    positon?: number | null
}

export interface UpdateCategory {
    id:number;
    updateData : postCategory
}




interface Category{
    getCatigory : ()=> any,
    postCatigory : (data:postCategory)=> any,
    deleteCategory : (id:number)=> any,
    updateCategory : (data:UpdateCategory)=> any,

    getSubCategoryId: (id:number)=> any,
}


export interface StoreCategory {
    isLoader:boolean;
    dataCategory:any[];
    dataSubCategory:any[];
    totlCount:number;
    subCategoryCount:number;
    getDataCategory: ()=> Promise <any>;
    postDatacategory: (data:postCategory)=> Promise <any>;
    deleteDataCategory: (id:number)=> Promise <any>;
    updateDataCategory: (data:UpdateCategory)=> Promise <any>;
    getDataSubCategoryId: (id:number)=> Promise <any>;
}

export const category:Category = {
    getCatigory: ()=> request.get(`/api/category/get-all-category/q`),
    postCatigory: (data)=> request.post("/api/category/create" , data),
    deleteCategory: (id)=> request.delete(`/api/category/delete/${id}`),
    updateCategory: (data)=> request.put(`/api/category/update/${data.id}`, data.updateData),

    getSubCategoryId: (id)=> request.get(`/api/category/get-all-subcategory/${id}/q`)
}