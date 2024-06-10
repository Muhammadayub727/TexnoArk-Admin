// import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { ToastContainer ,} from "react-toastify";


import useProductStore from "../../store/product-store";
import GlobalTable  from "../../components/ui/table";
import  ModalProduct from "../../components/modals/product";
import { InputBase, Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



function index() {
  // const navigate = useNavigate();
  const [change, setChange] = useState("")
  const [search, setSearch] = useState("")
  const [parms , setParams] = useState({limit: 10, page:1 , search:change})
  const {getProduct, dataProduct ,  isLoader } = useProductStore();
  // const totleCuont2 = Math.ceil(totlCount / parms?.limit) 
  
  useEffect(() => {
    getProduct(parms);
  }, [parms , change]);
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
    setChange(searchString)
    
  },[location.search]);


  const theder = [
    {title: "S/N" , value:"t/r"},
    {title: "Product name" , value:"name"},
    {title: "Price" , value:"price"},
    {title: "Action" , value:"action6"},
  ]

  const handleSearchChange = (e:any) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setParams({ ...parms, search: newSearch });
};


// const changePage = (value:number)=>{
//   setParams(preParams=>({
//       ...preParams,
//       page:value
//   }));
// }



  return <>
    <ToastContainer />
            <div className="py-3 flex justify-between items-center">
                <div className="w-96 ">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Products"
                            inputProps={{ 'aria-label': 'search products' }}
                            onChange={handleSearchChange}
                            value={search}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
                    <ModalProduct title="post" />
            </div>
            <GlobalTable heders={theder} body={dataProduct} skelatonLoader={isLoader} />
  </>
}

export default index