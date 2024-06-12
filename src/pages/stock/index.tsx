import { useEffect , useState} from "react";
import { ToastContainer ,} from "react-toastify";


import useStockStore from "../../store/stock-store";
import GlobalTable from "../../components/ui/table";
import ModalStock from "../../components/modals/stock";
function index() {
    //   const navigate = useNavigate();
    //   const [change, setChange] = useState("")
    const [parms , setParams] = useState({limit: 10, page:1 ,})
    const {getStock, dataStock , isLoader} = useStockStore();
    // const totleCuont2 = Math.ceil(totlCount / parms?.limit) 
    
    useEffect(() => {
        getStock(parms);
    }, [parms , setParams]);

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const page = params.get("page");
        const pageNuber = page ? parseInt(page): 1;
        setParams(preParams=>({
        ...preParams,
            page:pageNuber,
        }));
        
    },[location.search]);


const theder = [
    {title: "S/N" , value:"t/r"},
    {title: "Product name" , value:"product_id?.name"},
    {title: "Quantity" , value:"quantity"},
    {title: "Action" , value:"action7"}
]


  //--- pagination tett mui <----
// const changePage = (value:number)=>{
//   setParams(preParams=>({
//       ...preParams,
//       page:value
//   }));
// }



  // Hendel chenge ------>
// const hendalChange = (e:any)=>{
//   const search = e.target.value;
//   setChange(search)
//   setParams(preParams=>({ ...preParams, search }))
//   const searchParams = new URLSearchParams(location.search);
//         searchParams.set("search", search)
//         navigate (`?${searchParams}`)

// }

///---------------------

return <>
    <ToastContainer />
    <div className="py-3 flex items-center justify-end">
      {/* <GlobalSearch search={change} hendelChange={hendalChange}/> */}
        <ModalStock title="post"/>
    </div>
    <GlobalTable heders={theder} body={dataStock} skelatonLoader={isLoader}/>
    {/* <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage}/> */}
</>
}

export default index