import { useEffect, useState } from "react";
import { ToastContainer ,} from "react-toastify";


import useBrandStore from "../../store/brand-store";
import GlobalTable from "../../components/ui/table";
import ModalBrand from "../../components/modals/brand"
function index() {
    const {getBrand , dataBrands , isLoader} = useBrandStore();
    const [ params , ] = useState({limit: 10, page:1})
    
    useEffect(() => {
      getBrand(params);
    }, []);
  
  
    const theder = [
      {title: "S/N" , value:"t/r"},
      {title: "Brand" , value:"name"},
      {title: "Action" , value:"action"}
    ]
  
    return <>
      <ToastContainer />
      <div className="py-3">
        <ModalBrand title="post"/>
      </div>
      <GlobalTable heders={theder} body={dataBrands} skelatonLoader={isLoader}/>
    </>
  }
  
  export default index