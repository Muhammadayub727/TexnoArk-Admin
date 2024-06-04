import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import  ModalCategory  from "../../components/modals/category"
import  GlobalTable  from "../../components/ui/table";
import useCategoryStore from "../../store/category-store"



function Index() {

const {getDataCategory , dataCategory , isLoader} =  useCategoryStore();

useEffect(() =>{
    getDataCategory();
},[]);


const theder = [
    {title: "S/N" , value:"t/r"},
    {title: "Category" , value:"category_name"},
    {title: "Action" , value:"action2"}
]
return <>
    <ToastContainer />
    <div className="py-3">
    <ModalCategory title="post"/>
</div>
    <GlobalTable  heders={theder} body={dataCategory} skelatonLoader={isLoader}/>
</>
}

export default Index    