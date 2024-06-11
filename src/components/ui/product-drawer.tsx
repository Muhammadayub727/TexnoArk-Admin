// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { TextField, Button } from "@mui/material";
import { useState } from "react";
// import ClearIcon from '@mui/icons-material/Clear';
// import axios from 'axios';

// import {getDataFromCookie} from "../../utils/data-service"

export default function ProductDrawer() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    // const initialValues = {
    //     quantity: "",
    //     discount: "",
    //     description: "",
    //     color: "",
    //     files: [],
    // };

    // const handleSubmit = async (values: any) => {
    //     const formData = new FormData();
    //     formData.append("quantity", values.quantity);
    //     formData.append("discount", values.discount);
    //     formData.append("description", values.description);
    //     formData.append("color", values.color.trim());
    //     formData.append("product_id", id.toString());

    //     values.files.forEach((file: any, index: number) => {
    //     formData.append(`files[${index}]`, file);
    //     });
    //     //  console.log(formData);
    //     const access_token = getDataFromCookie("access_token") 
        
    //     try {
    //     const response = await axios.post("https://ecomapi.ilyosbekdev.uz/product-detail/create", formData, {
    //         headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization:  `Bearer ${access_token}`
    //         },
    //     });
    //     console.log(response);
    //     } catch (err) {
    //     console.log(err);
    //     }
    // };

    // const DrawerList = (
    //     <>
    //     <Box
    //         sx={{ width: 400 }}
    //         role="presentation"
    //     >
    //         <div className="w-full h-full">
    //         <div className="py-2 px-2 flex justify-end">
    //             <button onClick={toggleDrawer(false)} className="py-1 px-2 rounded-md hover:shadow-md duration-200">
    //             <ClearIcon />
    //             </button>
    //         </div>
    //         <div className="px-3 pt-4">
    //             <Formik
    //             initialValues={initialValues}
    //             validationSchema={productDetailValidationSchema}
    //             onSubmit={handleSubmit}
    //             >
    //             {({ setFieldValue }) => (
    //                 <Form className="w-full flex flex-col gap-[8px]">
    //                 <h2 className="text-center text-[#D55200] text-[22px] pb-4 font-semibold">Create new product detail</h2>

    //                 <Field
    //                     as={TextField}
    //                     label="Quantity"
    //                     sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
    //                     type="number"
    //                     name="quantity"
    //                     className="w-[100%] mb-3 outline-none py-0"
    //                     helperText={
    //                     <ErrorMessage
    //                         name="quantity"
    //                         component="span"
    //                         className="mb-3 text-red-500 text-center"
    //                     />
    //                     }
    //                 />

    //                 <Field
    //                     as={TextField}
    //                     label="Discount"
    //                     sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
    //                     type="number"
    //                     name="discount"
    //                     className="w-[100%] mb-3 outline-none py-0"
    //                     helperText={
    //                     <ErrorMessage
    //                         name="discount"
    //                         component="span"
    //                         className="mb-3 text-red-500 text-center"
    //                     />
    //                     }
    //                 />

    //                 <Field
    //                     as={TextField}
    //                     label="Description"
    //                     sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
    //                     type="text"
    //                     name="description"
    //                     className="w-[100%] mb-3 outline-none py-0"
    //                     helperText={
    //                     <ErrorMessage
    //                         name="description"
    //                         component="span"
    //                         className="mb-3 text-red-500 text-center"
    //                     />
    //                     }
    //                 />

    //                 <Field
    //                     as={TextField}
    //                     label="Color"
    //                     sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
    //                     type="text"
    //                     name="color"
    //                     className="w-[100%] mb-3 outline-none py-0"
    //                     helperText={
    //                     <ErrorMessage
    //                         name="color"
    //                         component="span"
    //                         className="mb-3 text-red-500 text-center"
    //                     />
    //                     }
    //                 />

    //                 {Array.from({ length: 2 }, (_, index) => (
    //                     <div key={index}>
    //                     <input
    //                         type="file"
    //                         name={`files[${index}]`}
    //                         className="w-[100%] mb-3 outline-none py-0"
    //                         onChange={(event) => {
    //                         const files = event.currentTarget.files;
    //                         if (files) {
    //                             setFieldValue(`files[${index}]`, files[0]);
    //                         }
    //                         }}
    //                     />
    //                     <ErrorMessage
    //                         name={`files[${index}]`}
    //                         component="div"
    //                         className="mb-3 text-red-500 text-center"
    //                     />
    //                     </div>
    //                 ))}

    //                 <Button
    //                     sx={{ fontSize: "16px", fontWeight: "600", padding: "14px", backgroundColor: "#1EB91E", "&:hover": { background: "#1EB91E" } }}
    //                     variant="contained"
    //                     type="submit"
    //                     className="w-[100%]"
    //                 >
    //                     Create
    //                 </Button>
    //                 </Form>
    //             )}
    //             </Formik>
    //         </div>
    //         </div>
    //     </Box>
    //     </>
    // );

    return (
        <div>
        <button
            aria-label="add to favorites"
            onClick={toggleDrawer(true)}
            className="py-2 px-5 rounded-md bg-[#1EB91E] text-white font-medium hover:bg-[#1EB91E] duration-300 active:bg-[#1EB91E]"
        >
            Create
        </button>

        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {/* {DrawerList} */}
        </Drawer>
        </div>
    );
    }
