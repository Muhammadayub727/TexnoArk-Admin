import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import  ModalCategory  from "../../components/modals/category"
import  GlobalTable  from "../../components/ui/table";
import useCategoryStore from "../../store/category-store"



function index() {
        const [search , ] = useState("")
        const [dataGet ,] = useState({limit: 10, page:1 , search:search})
        const {getDataCategory , dataCategory , isLoader} =  useCategoryStore();
        
        useEffect(() =>{
            getDataCategory(dataGet);
        },[]);
        
        
        const theder = [
        {title: "S/N" , value:"t/r"},
        {title: "Category" , value:"name"},
        {title: "Action" , value:"action2"}
        ]
        return <>
        <ToastContainer />
        <div className="py-3">
            <ModalCategory title="post" 
            />
        </div>
        <GlobalTable heders={theder} body={dataCategory} skelatonLoader={isLoader}/>
        </>
        }
        
        export default index