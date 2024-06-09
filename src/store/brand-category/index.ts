
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { brandCategory ,StoreBrandCategory } from '../../interface/brand-category';


const useBrandCategoryStore = create <StoreBrandCategory> ((set)=>({
    isLoader: false,
    dataBrandsCategory: [],
    dataBrandCategoryId: [],
    totlCount: 0,
    totlCountBrandCategory: 0,
    getBrandCategory : async(data)=>{
            try{
            set({isLoader: true})
            const respons = await brandCategory.get(data)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataBrandsCategory: respons?.data?.data?.brandCategories});
                set({totlCount: respons?.data?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
    },

    postBrandCategory: async(data)=>{
                try{
                    const respons = await brandCategory.post(data)
                //    console.log(respons)
                    if(respons.status === 201){
                        set((state)=>({
                            dataBrandsCategory: state.dataBrandsCategory.length < 10 ?  [...state.dataBrandsCategory, respons?.data?.data] : [...state.dataBrandsCategory],
                            dataBrandCategoryId: state.dataBrandCategoryId.length < 10 ? [...state.dataBrandCategoryId, respons?.data?.data] : [...state.dataBrandCategoryId],
                        })) 
                        set((state)=>({
                            totlCount: state.totlCount += 1 ,
                            totlCountBrandCategory: state.totlCountBrandCategory += 1 ,
                        }))
                        return respons?.status
                    }
                }catch(error){
                    console.log(error)
                }
    },

        deleteBrandCategory: async(id)=>{
            try{
            const respons = await brandCategory.delete(id)
            //    console.log(respons)
            if(respons.status === 200){
                set((state)=>({
                    dataBrandsCategory: state.dataBrandsCategory.filter((el:any)=>el.id !== id),
                    dataBrandCategoryId: state.dataBrandCategoryId.filter((el:any)=>el.id!== id),
                })) 
                set((state)=>({
                    totlCount: state.totlCount -= 1,
                    totlCountBrandCategory: state.totlCountBrandCategory -= 1
                }))
                toast.success("Deleted successfully")
            }
            }catch(error:any){
                console.log(error)
            }
    },

    updateBrandCategory: async(data)=>{
            try{
                const respons = await brandCategory.update(data)
                if(respons?.status === 200){
                    set((state)=>({
                        dataBrandsCategory: state.dataBrandsCategory.map((el:any)=>el.id === data?.id ? {...data.putData , id:data.id} : el),
                        dataBrandCategoryId: state.dataBrandCategoryId.map((el:any)=>el.id === data?.id? {...data.putData, id:data.id} : el),
                    }))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },
    getCategoryBrandId: async(data)=>{
            try{
            const respons = await brandCategory.getCategoryBrandId(data)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataBrandCategoryId: respons?.data?.data?.brandCategories})
                set({totlCountBrandCategory: respons?.data?.data?.count})
            }
            }catch(error:any){
                console.log(error)
            }
    }

}))

export default useBrandCategoryStore