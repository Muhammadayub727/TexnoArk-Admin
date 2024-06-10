import { useParams } from "react-router-dom";
import { useEffect ,  } from "react";
import ImageGallery from "react-image-gallery"; 

import ProductDrawer from '../../components/ui/product-drawer'
import useProductStore from "../../store/product-store";
import "./style.scss"

function index() {

    const { id } = useParams();
    const productId = Number(id);
    const {getProductId , productsId , isLoader} = useProductStore();
    

        const getProduct = ()=>{
        getProductId(productId)
    }
        
        useEffect(()=>{
            getProduct()
        },[productId]);


    return <>
        {
            isLoader ? <div>Loader ...</div>
            : <div>
            {
            productsId?.product_detail ? 
            <div className="flex flex-col md:flex-row  items-start justify-between pt-[100px]">
                <div className="max-w-[600px] max-h-[700px] w-full h-full ">
                {
                    productsId?.product_detail?.images &&
                    <ImageGallery
                    autoPlay={false}
                    infinite={true}
                    thumbnailPosition={"left"}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    items={productsId?.product_detail?.images?.map((image:any) =>{
                    return {
                        original: image,
                        thumbnail: image,
                    };
                    })}
                />
                    
                }
            {/* <img  className=" max-h-[450px] w-full h-full" src={product?.image_url ? product?.image_url[0] : "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg"} alt={product?.product_name} /> */}
                </div>
                <div className="p-2 md:max-w-[330px] lg:max-w-[550px] w-full">
            <h1 className="text-center text-[22px]">{productsId?.product?.name}</h1>
            <p className="py-3 text-gray-600">Product description : {productsId?.product_detail?.description}</p>
            {/* <p className="flex items-center justify-between pb-[2px] border-b  mb-2 ">Sifati : <Stack spacing={1} sx={{paddingY:1}}>
                <Rating name="size-medium" defaultValue={4} size="large" />
                </Stack>
            </p> */}
            <p className="flex items-center justify-between pb-[2px] border-b mb-2 ">Product colors : <span className=" text-gray-500 pl-2"> {productsId?.product_detail?.colors && productsId?.product_detail?.colors.map((el:any)=>{
            return <span key={el} className="   pl-3">{el}  </span>
            })}</span></p>
            <p className="flex items-center justify-between pb-[2px] border-b mb-2 ">Product quantity : <span className="text-red-500 pl-2">{productsId?.product_detail?.quantity} ta</span></p>
            <p className="flex items-center justify-between pb-[2px] border-b  mb-2 ">Product discount indicator : <span className="text-red-500 pl-2">{productsId?.product_detail?.discount} %</span> </p>
            <del className=" text-gray-500 font-serif flex justify-end">{productsId?.product?.price} $</del> 
            <p className='flex items-center justify-between pb-[2px] border-b  mb-2 '>Price : <span className=" text-red-500"> {Math.ceil(productsId?.product?.price - (productsId?.product?.price / 100) * productsId?.product_detail?.discount) } $</span></p>  
            <div className='flex items-center justify-between'>

                <div className="flex items-center gap-3 ">
                {/* <IconButton aria-label="add to favorites" onClick={()=>{btnLike(product?.product_id)}} >
                    <FavoriteIcon fontSize="medium"/>
                </IconButton>
                <IconButton aria-label="add to favorites"  >
                    <ShoppingCartIcon fontSize="medium"/>
                </IconButton> */}
                </div>
            </div>

            <div className=' pt-10 flex flex-col gap-3'>
                <div className='flex items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17C10 16.4696 9.78929 15.9609 9.41421 15.5858C9.03914 15.2107 8.53043 15 8 15C7.46957 15 6.96086 15.2107 6.58579 15.5858C6.21071 15.9609 6 16.4696 6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19V19ZM18 19C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.5304 15 18 15C17.4696 15 16.9609 15.2107 16.5858 15.5858C16.2107 15.9609 16 16.4696 16 17C16 17.5304 16.2107 18.0391 16.5858 18.4142C16.9609 18.7893 17.4696 19 18 19V19Z" stroke="#240E00" stroke-opacity="0.8" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.05 17H15V6.6C15 6.44087 14.9368 6.28826 14.8243 6.17574C14.7117 6.06321 14.5591 6 14.4 6H1M5.65 17H3.6C3.52121 17 3.44319 16.9845 3.37039 16.9543C3.29759 16.9242 3.23145 16.88 3.17574 16.8243C3.12002 16.7686 3.07583 16.7024 3.04567 16.6296C3.01552 16.5568 3 16.4788 3 16.4V11.5" stroke="#240E00" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M2 9H6" stroke="#240E00" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 9H20.61C20.726 9.00003 20.8395 9.03367 20.9367 9.09685C21.034 9.16003 21.1108 9.25005 21.158 9.356L22.948 13.384C22.9821 13.4605 22.9998 13.5433 23 13.627V16.4C23 16.4788 22.9845 16.5568 22.9543 16.6296C22.9242 16.7024 22.88 16.7686 22.8243 16.8243C22.7686 16.88 22.7024 16.9242 22.6296 16.9543C22.5568 16.9845 22.4788 17 22.4 17H20.5M15 17H16" stroke="#240E00" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <p>Delivery throughout Uzbekistan</p>
                </div>
                <div className='flex items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 10.9136C2.84932 10.6138 2 9.56756 2 8.32297C2 7.9824 2.06499 7.64495 2.19147 7.32874L3.06575 5.14305C3.82507 3.24475 5.66361 2 7.70813 2H16.2919C18.3364 2 20.1749 3.24476 20.9343 5.14305L21.8085 7.32874C21.935 7.64495 22 7.9824 22 8.32297C22 9.56756 21.1507 10.6138 20 10.9137V20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21C2 20.4477 2.44772 20 3 20H4V10.9136ZM6.74871 4.15741C5.93121 4.43347 5.25486 5.05543 4.9227 5.88583L4.04842 8.07152C4.01644 8.15149 4 8.23684 4 8.32297C4 8.69688 4.30312 9 4.67703 9H5.1802C5.63296 9 6 8.63296 6 8.1802C6 7.99451 6.01834 7.80927 6.05476 7.62719L6.74871 4.15741ZM10 20H14V18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18V20ZM16 20V18C16 15.7909 14.2091 14 12 14C9.79086 14 8 15.7909 8 18V20H6V10.879C6.37162 10.7662 6.71077 10.5788 7 10.3343C7.49113 10.7496 8.12622 11 8.8198 11H10C10.7684 11 11.4692 10.7111 12 10.2361C12.5308 10.7111 13.2316 11 14 11H15.1802C15.8738 11 16.5089 10.7496 17 10.3342C17.2892 10.5788 17.6284 10.7662 18 10.879V20H16ZM18.8198 9H19.323C19.6969 9 20 8.69688 20 8.32297C20 8.23684 19.9836 8.15149 19.9516 8.07152L19.0773 5.88583C18.7451 5.05543 18.0688 4.43347 17.2513 4.15741L17.9452 7.62719C17.9817 7.80927 18 7.99451 18 8.1802C18 8.63296 18.367 9 18.8198 9ZM8.8198 4L8.01592 8.01942C8.00533 8.07236 8 8.12621 8 8.1802C8 8.63296 8.36704 9 8.8198 9H10C10.5523 9 11 8.55228 11 8V4H8.8198ZM15.1802 4L15.9841 8.01942C15.9947 8.07236 16 8.12621 16 8.1802C16 8.63296 15.633 9 15.1802 9H14C13.4477 9 13 8.55228 13 8V4H15.1802Z" fill="#240E00" fill-opacity="0.8"/>
                </svg>
                <p>You can take the store away</p>
                </div>
                <div className='flex items-center gap-4'>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#240E00" fill-opacity="0.8"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12.5523 6 13 6.44772 13 7V11.5858L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V7C11 6.44772 11.4477 6 12 6Z" fill="#240E00" fill-opacity="0.8"/>
                </svg>
                <p>Estimated delivery is 1 to 3 days</p>
                </div>
            </div>
                </div>
            </div>



                : <div className="w-full h-full ">
                {/* <button className=" py-2 px-2 rounded-md mb-5 hover:shadow-md duration-300"><KeyboardReturnIcon/></button> */}
                <div className="">
                    <div className="flex flex-col gap-2 max-w-[400px]">
                    <h1 className="flex items-center justify-between pb-1 border-b ">Product name : <span className="text-[#D56E00] font-medium">{productsId?.product?.name}</span></h1>
                    <p className="flex items-center justify-between pb-1 border-b ">Product price : <span className="text-[#D56E00] font-medium">{productsId?.product?.price} $</span></p>
                    <div className="flex items-center justify-between">
                        <p>Add product details :</p>
                        <ProductDrawer id={productId} />
                    </div>
                    </div>
                </div>
                </div>
            }
            </div>
        }   
    </>  
}

export default index