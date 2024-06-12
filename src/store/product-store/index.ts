import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
// import { useNavigate } from 'react-router-dom';

import { product , StoreProduct } from '../../interface/product';

// const navigate = useNavigate()



const useProductStore = create <StoreProduct> ((set)=>({
    isLoader: false,
    dataProduct: [],
    dataProductsBrandId:[],
    totlCount: 0,
    productsId: null ,
        getProduct : async(data)=>{
            try{
            set({isLoader: true})
            const respons = await product.get(data)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataProduct: respons?.data?.data?.products});
                set({totlCount: respons?.data?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
        },

        getProductId :async(id)=>{
            try{
            set({isLoader: true})
            const respons = await product.getId(id)
            //    console.log(respons)
            if(respons.status === 200){
                set({productsId: respons?.data?.data})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        },

        postProduct: async(data)=>{
            
                try{
                    const respons = await product.post(data)
                //    console.log(respons)
                    if(respons.status === 201){
                        set((state)=>({dataProduct: state.dataProduct.length < 10 ? [...state.dataProduct, respons?.data?.data] : [...state.dataProduct]})) 
                        set((state)=>({totlCount: state.totlCount += 1}))
                        return respons?.status
                    }
                }catch(error){
                    console.log(error)
                }
        },

        deleteProduct: async(id)=>{
            try{
            const respons = await product.delete(id)
            //    console.log(respons)
            if(respons.status === 200){
                set((state)=>({dataProduct: state.dataProduct.filter((el:any)=>el.id !== id)})) 
                set((state)=>({totlCount: state.totlCount -= 1}))
                toast.success("Deleted successfully")
            }
            }catch(error:any){
                console.log(error)
            }
        },

        updateProduct: async(data)=>{
                try{
                    const respons = await product.update(data)
                    if(respons?.status === 200){
                        set((state)=>({dataProduct: state.dataProduct.map((el:any)=>el.id === data?.id ? {...data.putData , id:data.id} : el)}))
                        return respons?.status
                    }
                    
                    }catch(error:any){
                        console.log(error)
                    }
        },

        // deleteProductDetels: async(id)=>{
        //     try{
        //        const respons = await product.deleteProducDetels(id)
        //     //    console.log(respons)
        //        if(respons.status === 200){
                
        //             set((state)=>({productsId: {...state.getProductId , product_detail:null}})) ;
                    
        //             return respons?.status
        //        }
        //     }catch(error:any){
        //         console.log(error)
        //     }
        // },

        // updateProductDetels : async(data)=>{
        //         try{
        //             const respons = await product.updateProductDetels(data)
        //             if(respons?.status === 200){
        //                 // set((state)=>({productsId: {...state.productsId,...data.putData}}))
        //                 return respons?.status
        //             }
                    
        //             }catch(error:any){
        //                 console.log(error)
        //             }
        // },

        getProductsBrandId: async(id)=>{
            try{
            set({isLoader: true})
            const respons = await product.getProductsBrandId(id)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataProductsBrandId: respons?.data?.data})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        },
}))

export default useProductStore