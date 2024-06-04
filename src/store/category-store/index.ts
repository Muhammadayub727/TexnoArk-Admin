
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { category ,StoreCategory } from '../../interface/category';


const useCategoryStore = create <StoreCategory> ((set)=>({
    isLoader: false,
    dataCategory: [],
    dataSubCategory:[],
    totlCount: 0,
    subCategoryCount:0,
        getDataCategory : async()=>{
            try{
            set({isLoader: true})
            const respons = await category.getCatigory()
            //    console.log(respons)
            if(respons.status === 200){
                set({dataCategory: respons?.data?.categories});
                set({totlCount: respons?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
        },
        postDatacategory: async(data)=>{
            if(!data.parent_category_id){
                try{
                    const respons = await category.postCatigory(data)
                //    console.log(respons)
                    if(respons.status === 201){
                        set((state)=>({dataCategory: [...state.dataCategory, respons?.data?.category]})) 
                        set((state)=>({totlCount: state.totlCount += 1}))
                        return respons?.status
                    }
                }catch(error){
                    console.log(error)
                }
            }else{
                try{
                    const respons = await category.postCatigory(data)
                //    console.log(respons)
                    if(respons.status === 201){
                        set((state)=>({dataSubCategory: [...state.dataSubCategory, respons?.data?.category]})) 
                        set((state)=>({subCategoryCount: state.totlCount += 1}))
                        return respons?.status
                    }
                }catch(error){
                    console.log(error)
                }
            }
        },
        deleteDataCategory: async(id)=>{
            try{
            const respons = await category.deleteCategory(id)
            //    console.log(respons)
            if(respons.status === 200){
                set((state)=>({dataSubCategory: state.dataSubCategory.filter((el:any)=>el.id!== id)}))
                set((state)=>({dataCategory: state.dataCategory.filter((el:any)=>el.id !== id)})) 
                set((state)=>({subCategoryCount: state.subCategoryCount -= 1}))
                set((state)=>({totlCount: state.totlCount -= 1}))
                toast.success("Deleted successfully")
            }
            }catch(error:any){
                console.log(error)
            }
        },
        updateDataCategory: async(data)=>{
            if(!data.updateData.parent_category_id){
                try{
                    const respons = await category.updateCategory(data)
                    if(respons?.status === 200){
                        set((state)=>({dataCategory: state.dataCategory.map((el:any)=>el.id === data?.id ? {...data.updateData , id:data.id} : el)}))
                        return respons?.status
                    }
                    
                    }catch(error:any){
                        console.log(error)
                    }
            }else{
                try{
                    const respons = await category.updateCategory(data)
                    if(respons?.status === 200){
                        set((state)=>({dataSubCategory: state.dataSubCategory.map((el:any)=>el.id === data?.id ? {...data.updateData , id:data.id} : el)}))
                        return respons?.status
                    }
                    
                    }catch(error:any){
                        console.log(error)
                    }
            }
        },

        getDataSubCategoryId: async(id)=>{
            try{
                set({isLoader: true})
            const respons = await category.getSubCategoryId(id)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataSubCategory: respons?.data?.categories});
                set({subCategoryCount: respons?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
        }

}))

export default useCategoryStore