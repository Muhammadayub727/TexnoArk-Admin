
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { brand ,StoreBrand } from '../../interface/brand';


const useBrandStore = create <StoreBrand> ((set)=>({
    isLoader: false,
    dataBrands: [],
    totlCount: 0,
        getBrand : async()=>{
            try{
            set({isLoader: true})
            const respons = await brand.get()
            //    console.log(respons)
            if(respons.status === 200){
                set({dataBrands: respons?.data?.brands});
                set({totlCount: respons?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
        },
        postBrand: async(data)=>{
            try{
            const respons = await brand.post(data)
            //    console.log(respons)
            if(respons.status === 201){
                set((state)=>({dataBrands: [...state.dataBrands, respons?.data?.brand]})) 
                set((state)=>({totlCount: state.totlCount += 1}))
                return respons?.status
            }
            }catch(error){
                console.log(error)
            }
        },
        deleteBrand: async(id)=>{
            try{
            const respons = await brand.delete(id)
            //    console.log(respons)
            if(respons.status === 200){
                set((state)=>({dataBrands: state.dataBrands.filter((el:any)=>el.id!== id)})) 
                set((state)=>({totlCount: state.totlCount -= 1}))
                toast.success("Deleted successfully")
            }    
            }catch(error:any){
                console.log(error)
            }
        },
        updateBrand: async(data)=>{
            try{
            const respons = await brand.update(data)
            if(respons?.status ===200){
                set((state)=>({dataBrands: state.dataBrands.map((el:any)=>el.id === data?.id ? data.putData : el)}))
                return respons?.status
            }
            
            }catch(error:any){
                console.log(error)
            }
        }

}))

export default useBrandStore