import axios from 'axios';
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { brand ,StoreBrand } from '../../interface/brand';
import {getDataFromCookie} from "../../utils/data-service" 






    const useBrandStore = create <StoreBrand> ((set)=>({
        isLoader: false,
        dataBrands: [],
        totlCount: 0,
        getBrand : async(data)=>{
            try{
            set({isLoader: true})
            const respons = await brand.get(data)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataBrands: respons?.data?.data?.brands});
                //    set({totlCount: respons?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
        },
        postBrand: async(data)=>{
            try {
                const response = await axios.post('https://ecomapi.ilyosbekdev.uz/brand', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                getDataFromCookie("acsses_token");
                console.log(response);
                if (response.status === 201) {
                    set((state) => ({ dataBrands: [...state.dataBrands, { ...data, product_id: response?.data?.id }] }));
                    toast.success("Successfully added");
                    return response?.status;
                }
            } catch (error) {
                console.log(error);
                toast.error("Error: ");
            }

        },
        deleteBrand: async(id)=>{
            try{
            const respons = await brand.delete(id)
            if(respons.status === 200){
                set((state)=>({dataBrands: state.dataBrands.filter((el:any)=>el.id!== id)})) 
                // set((state)=>({totlCount: state.totlCount -= 1}))
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

