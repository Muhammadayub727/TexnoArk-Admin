
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { brand ,StoreBrand } from '../../interface/brand';
import axios from 'axios';

import {getDataFromCookie} from "../../utils/data-service" 


const useBrandStore = create <StoreBrand> ((set)=>({
    isLoader: false,
    dataBrands: [],
    dataBrandsId: [],
    totlCount: 0,
    getBrand : async(data)=>{
            try{
            set({isLoader: true})
            const respons = await brand.get(data)
            //    console.log(respons)
            if(respons.status === 200){
                set({dataBrands: respons?.data?.data?.brands});
                set({totlCount: respons?.data?.data?.count})
            }
            set({isLoader: false})
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
        
    },
    postBrand: async(data)=>{
        try {
            const response = await axios.post('https://ecomapi.ilyosbekdev.uz/brand/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            getDataFromCookie("acsses_token");
            // console.log(response);
            if (response.status === 201) {
                set((state) => ({ dataBrands: state.dataBrands.length < 10 ? [...state.dataBrands, response?.data?.data] : [...state.dataBrands] }));
                set((state)=>({totlCount: state.totlCount += 1}))
                return response?.status;
            }
        } catch (error) {
            console.log(error);
            toast.error("Error: ");
        }

    },
    deleteBrand: async(id:any)=>{
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
            set((state)=>({dataBrands: state.dataBrands.map((el:any)=>el.id === data?.id ? {...data.putData , id:data?.id} : el)}))
            return respons?.status
        }
        
        }catch(error:any){
            console.log(error)
        }
    },
    getCategoryId: async(data)=>{
        try{
            const respons = await brand.getCategoryId(data)
            if(respons?.status === 200){
                set(({dataBrandsId: respons?.data?.data?.brands}))
            }
        }catch(error:any){
            console.log(error)
        }
    }

}))

export default useBrandStore