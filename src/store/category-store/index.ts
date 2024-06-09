
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { category ,StoreCategory } from '../../interface/category';


const useCategoryStore = create <StoreCategory> ((set)=>({
    isLoader: false,
    dataCategory: [],
    totlCount: 0,
    getDataCategory : async(data)=>{
            try{
            set({isLoader: true})
            let respons
            if (data.search) {
                respons = await category.getCatigory(data) 
                }else{
                respons = await category.getCatigoryOnly(data) 
            }
            //    console.log(respons)
            if(respons.status === 200){
                set({dataCategory: respons?.data?.data?.categories});
                set({totlCount: respons?.data?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
    },

    postDatacategory: async(data)=>{
                try{
                    const respons = await category.postCatigory(data)
                //    console.log(respons)
                    if(respons.status === 201){
                        set((state)=>({dataCategory: state.dataCategory.length < 10 ? [...state.dataCategory, respons?.data?.data] : [...state.dataCategory]})) 
                        set((state)=>({totlCount: state.totlCount += 1}))
                        return respons?.status
                    }
                }catch(error){
                    console.log(error)
                }
    },

    deleteDataCategory: async(id)=>{
            try{
            const respons = await category.deleteCategory(id)
            //    console.log(respons)
            if(respons.status === 200){
                set((state)=>({dataCategory: state.dataCategory.filter((el:any)=>el.id !== id)})) 
                set((state)=>({totlCount: state.totlCount -= 1}))
                toast.success("Deleted successfully")
            }
            }catch(error:any){
                console.log(error)
            }
    },

    updateDataCategory: async(data)=>{
            try{
                const respons = await category.updateCategory(data)
                if(respons?.status === 200){
                    set((state)=>({dataCategory: state.dataCategory.map((el:any)=>el.id === data?.id ? {...data.updateData , id:data.id} : el)}))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCategoryStore