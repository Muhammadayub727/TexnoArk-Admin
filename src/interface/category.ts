import request from "../service/config"

export interface postCategory{
    category_name: string,
    parent_category_id?: number | null ,
    // positon?: number | null
}

export interface UpdateCategory {
    id:number;
    updateData : postCategory
}

export interface GetCatigory{
    page:number,
    limit:number,

}


interface Category{
    getCatigory : (params:GetCatigory)=> any,
    postCatigory : (data:postCategory)=> any,
    deleteCategory : (id:number)=> any,
    updateCategory : (data:UpdateCategory)=> any,

    // getSubCategoryId: (id:number)=> any,
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
    getCatigory: (params)=> request.get(`/category?page=${params.page}&limit=${params.limit}`),
    postCatigory: (data)=> request.post("/category" , data),
    deleteCategory: (id)=> request.delete(`/category/${id}`),
    updateCategory: (data)=> request.put(`/category/${data.id}`, data.updateData),

    // getSubCategoryId: (id)=> request.get(`/api/category/get-all-subcategory/${id}/q`)
}