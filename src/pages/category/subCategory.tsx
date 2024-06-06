// import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

// import useCategoryStore from "../../store/category-store";
// import GlobalTable from "../../components/ui/table"
import SubCategory from "../../components/modals/subCategory";
// import { useParams } from "react-router-dom";

function subcategory() {

   //  const {getDataSubCategoryId , dataSubCategory , isLoader } = useCategoryStore();
   //  const { subcategory } = useParams();
   //  const subCatigoryId = Number(subcategory);

    // console.log(subCatigoryId);
    

     useEffect(()=>{
      //   getDataSubCategoryId(subCatigoryId)
     },[])

   //   const theder = [
   //      {title: "S/N" , value:"t/r"},
   //      {title: "Subcategory" , value:"category_name"},
   //      {title: "Parent Id" , value:"parent_category_id"},
   //      {title: "Action" , value:"action3"}
   //    ]

  return <>
     <ToastContainer />
     <div className="py-3">
        <SubCategory title="post" />
     </div>
     {/* <GlobalTable heders={theder} body={dataSubCategory} skelatonLoader={isLoader}/> */}
  </>
}

export default subcategory