
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { subCategory , StoreSubCategory } from '../../interface/sub-category';


const useSubCategoryStore = create <StoreSubCategory> ((set)=>({
    isLoader: false,
    dataSubCatigory: [],
    totlCount: 0,
    
    getDataSubCatigory: async (data) => {
        try {
            set({ isLoader: true });
            const response = await subCategory.getSubCatigory(data);
            if (response.status === 200) {
                set({
                    dataSubCatigory: response.data.data.subcategories,
                    totlCount: response.data.data.count
                });
            } else {
                console.log('Error fetching subcategories:', response);
            }
            set({ isLoader: false });
        } catch (error) {
            console.log('Error:', error);
            set({ isLoader: false });
        }
    },

    postDataSubCatigory: async(data)=>{
        
            try{
                const respons = await subCategory.postSubCatigory(data)
             //    console.log(respons)
                if(respons.status === 201){
                    set((state)=>({dataSubCatigory: [...state.dataSubCatigory, respons?.data?.data]})) 
                    set((state)=>({totlCount: state.totlCount += 1}))
                    return respons?.status
                }
            }catch(error){
                console.log(error)
            }
    },

    deleteDataSubCatigory: async(id)=>{
            try{
            const respons = await subCategory.deleteSubCatigory(id)
            //    console.log(respons)
            if(respons.status === 200){
                set((state)=>({dataSubCatigory: state.dataSubCatigory.filter((el:any)=>el.id !== id)})) 
                set((state)=>({totlCount: state.totlCount -= 1}))
                toast.success("Deleted successfully")
            }
            }catch(error:any){
                console.log(error)
            }
    },

    updateDataSubCatigory: async(data)=>{
            try{
                const respons = await subCategory.updateSubCatigory(data)
                if(respons?.status === 200){
                    set((state)=>({dataSubCatigory: state.dataSubCatigory.map((el:any)=>el.id === data?.id ? {...data.updateData , id:data.id} : el)}))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useSubCategoryStore