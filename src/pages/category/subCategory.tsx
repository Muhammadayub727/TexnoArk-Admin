import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import useSubCategoryStore from "../../store/sub-category";
import GlobalTable from "../../components/ui/table"
import SubCategory from "../../components/modals/subCategory";
import GlobalSearch from "../../components/ui/search";

function subcategory() {
      const navigate = useNavigate();
      const { subcategory } = useParams();
      const subCatigoryId = Number(subcategory);
      const {getDataSubCatigory , dataSubCatigory , isLoader } = useSubCategoryStore();
      const [serach , setSearch] =useState("");
      const [params , setParams] = useState({id:subCatigoryId ,limit:10 , page:1 , search:serach})

      useEffect(()=>{
         getDataSubCatigory(params)
      },[params , serach])
      useEffect(()=>{
         const params = new URLSearchParams(location.search);
         const page = params.get("page");
         const search = params.get("search");
         const searchString =  search ? search  : ""
         const pageNuber = page ? parseInt(page): 1;
         setParams(preParams=>({
            ...preParams,
            page:pageNuber,
            search:searchString
         }));
         setSearch(searchString)
         
      },[location.search]);

      const theder = [
         {title: "S/N" , value:"t/r"},
         {title: "Subcategory" , value:"name"},
         {title: "Parent ID" , value:"parent_category_id"},
         {title: "Action" , value:"action3"}
         ]
      const hendalChange = (e:any)=>{
         const search = e.target.value;
         setSearch(search)
         setParams(preParams=>({ ...preParams, search }))
         const searchParams = new URLSearchParams(location.search);
            searchParams.set("search", search)
            navigate (`?${searchParams}`)
   
   }

   return <>
      <ToastContainer />
      <div className="py-3 flex items-center justify-between">
            <GlobalSearch search={serach} hendelChange={hendalChange} />
         <SubCategory title="post" />
      </div>
      <GlobalTable heders={theder} body={dataSubCatigory} skelatonLoader={isLoader}/>
   </>
}

export default subcategory