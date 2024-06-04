// import { useEffect } from "react";
// import {GlobalTable} from "@ui";
import { useEffect , } from "react";
import { ToastContainer ,} from "react-toastify";


import useBrandStore from "../../store/brand-store";
import GlobalTable from "../../components/ui/table";
import ModalBrand from "../../components/modals/brand"
function index() {
const {getBrand , dataBrands , isLoader} = useBrandStore();

useEffect(() => {
    getBrand();
}, []);


const theder = [
    {title: "S/N" , value:"t/r"},
    {title: "Brand" , value:"brand_name"},
    {title: "Action" , value:"action"}
]

return<>
    <ToastContainer />
    <div className="py-3">
        <ModalBrand title="post"/>
    </div>
    <GlobalTable heders={theder} body={dataBrands} skelatonLoader={isLoader}/>
</>
}

export default index