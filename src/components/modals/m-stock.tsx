import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";


import useBrandStore from "../../store/brand-store";
import useCategoryStore from "../../store/category-store";
import useStockStore from "../../store/stock-store";
import useProductStore from "../../store/product-store";
import {postData} from "../../interface/stock"


    const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    };

    interface propsData{
    title: string;
    id?: string;
    data?: any;
    }

    export default function ModalStock({title , id , data}:propsData) {
    const { postStock , updateStock } = useStockStore();
    const {getDataCategory , dataCategory} = useCategoryStore();
    const {getCategoryId , dataBrandsId} = useBrandStore();
    const {getProductsBrandId , dataProductsBrandId} = useProductStore();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    useEffect(() => {
        getDataCategory({search:""});
    }, []);
    



    const validationSchema = Yup.object().shape({
        quantity: Yup.number().min(0, "must be at least greater than 0"),
        category_id: Yup.number().min(0, "must be at least greater than 0"),
        product_id: Yup.number().min(0, "must be at least greater than 0"),
        brand_id: Yup.number().min(0, "must be at least greater than 0"),

        // position: Yup.number().min(0, "must be at least greater than 0"),
    });

    const initialValues: postData = {
        quantity: data?.quantity || "", 
        brand_id: data?.brand_id || "",
        product_id: data?.brand_category_id || "",
        category_id: data?.category_id || "",
    };

    const handelSubmit = async (value:postData ) => {
        // const postValue = { name: value.name , parent_category_id:0 }
        if(!id){
        const status = await postStock(value);
        if (status === 201) {
        toast.success("success full");
        handleClose();
        } else {
        toast.error("Error :" + status);
        handleClose();
        }
        }else{
        const updateData= {id:id, putData : value}
        const status = await updateStock(updateData);
        if (status === 200) {
        toast.success("update success full"); 
        handleClose();
        } else {
        toast.error("Error :" + status);
        handleClose();
        }
        }
    };
    const handleChange1 = (id:number) => {
        getCategoryId({id:id})
    }

    const handleChange2 = (id:number) => {
        getProductsBrandId(id)
    }


    return (
        <div>
        {
            title == "post" ? 
            <button
            onClick={handleOpen}
            className="py-2 px-6 text-white font-semibold bg-[#D52200] hover:bg-[#9c4837] active:bg-[#D52200] duration-200 rounded-lg"
        >
            Stock Add
        </button> : 
        <Button
            color="inherit"
            onClick={handleOpen}
            sx={{ 
            color: '#767676' 
            }}
        >
            <EditIcon  />
        </Button>
        }
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handelSubmit}
            >
                <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
                <h1 className="text-center mb-2 text-[26px] font-bold">
                    {
                    title == "post"? "Add a stock" : "Edit a stock"
                    }
                </h1>
                
                <Field
                    name= "category_id"
                    type="text"
                    as={TextField}
                    label="Category ID"
                    select
                    className="relative"
                    margin="none"
                    variant="outlined"
                    fullWidth
                    helperText={
                        <ErrorMessage
                        name="category_id"
                        component="p"
                        className="text-[red] text-[15px]"
                        />
                    }
                    >
                    {dataCategory?.map((item: any, index: number) => (
                        <MenuItem key={index} value={item.id} onClick={()=>handleChange1(item.id)}>
                        {item.name}
                        </MenuItem>
                    ))}
                    </Field>

                <Field
                    name= "brand_id"
                    type="select"
                    as={TextField}
                    label="Brand ID"
                    select
                    className="relative"
                    margin="none"
                    variant="outlined"
                    fullWidth
                    helperText={
                        <ErrorMessage
                        name="brand_id"
                        component="div"
                        className="text-[red] text-[15px]"
                        />
                    }
                    >
                    {dataBrandsId?.map((item: any, index: number) => (
                        <MenuItem key={index} value={item.id} onClick={()=>handleChange2(item.id)} >
                        {item.name}
                        </MenuItem>
                    ))}
                    </Field>

                    <Field
                    name= "product_id"
                    type="text"
                    as={TextField}
                    label="Product ID"
                    select
                    className="relative"
                    margin="none"
                    variant="outlined"
                    fullWidth
                    
                    helperText={
                        <ErrorMessage
                        name="product_id"
                        component="p"
                        className="text-[red] text-[15px]"
                        />
                    }
                    >
                    {dataProductsBrandId?.map((item: any, index: number) => (
                        <MenuItem key={index} value={item?.id}>
                        {item?.name}
                        </MenuItem>
                    ))}
                    </Field>

                    
                <Field
                    as={TextField}
                    label="Quantity"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="quantity"
                    className=" w-[100%]  mb-3 outline-none py-0"
                    helperText={
                    <ErrorMessage
                        name="quantity"
                        component="p"
                        className="mb-3 text-red-500 text-center"
                    />
                    }
                />

                    
                
                <Button
                    sx={{ fontSize: "16px", fontWeight: "600" ,backgroundColor: "#D55200", "&:hover" :{background: "#D52200"} }}
                    variant="contained"
                    type="submit"
                    className="w-[100%] py-3"
                >
                    {title == "post" ? "Add" : "Edit"}
                </Button>
                </Form>
            </Formik>
            </Box>
        </Modal>
        </div>
  );
}
