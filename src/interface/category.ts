import request from "../service/config"

export interface postCategory{
    name: string, 
}

// export interface UpdateCategory {
//     id:number;
//     updateData : postCategory
// }
type UpdateCategory = {
    id: string;
    updateData: postCategory;
};


export interface GetCategory{
    search?: string,
    page?:number;
    limit?:number;
}




interface Category{
    getCatigory : (data:GetCategory)=> any,
    postCatigory : (data:postCategory)=> any,
    deleteCategory : (id:number)=> any,
    updateCategory : (data:UpdateCategory)=> any,
}

export interface StoreCategory {
    isLoader:boolean;
    dataCategory:any[];
    totlCount:number;
    getDataCategory: (data:GetCategory)=> Promise <any>;
    deleteDataCategory: (id:number)=> Promise <any>;
    postDatacategory: (data:postCategory)=> Promise <any>;
    updateDataCategory: (data:UpdateCategory)=> Promise <any>;
}




export const category:Category = {
    getCatigory: (data)=> request.get(`/category/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    deleteCategory: (id)=> request.delete(`/category/${id}`),
    postCatigory: (data)=> request.post("/category" , data),
    updateCategory: (data)=> request.patch(`/category/${data.id}`, data.updateData),
}