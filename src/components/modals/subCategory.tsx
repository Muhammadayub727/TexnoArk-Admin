// import * as React from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { Field, Formik, Form, ErrorMessage } from "formik";
// import { Button, TextField } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
// import { useParams } from "react-router-dom";

// import useCategoryStore from "../../store/category-store";
// import {postCategory} from "../../interface/category"


// const style = {
//     position: "absolute" as "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//     };

//     interface propsData{
//     title: string;
//     id?: number;
//     data?: any;
//     }

//     export default function SubCategory({title , id , data}:propsData) {
//     const { postDatacategory , updateDataCategory } = useCategoryStore();

//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

    
//     const { subcategory } = useParams();
//     const parentCategoryId = Number(subcategory);
    
//     const validationSchema = Yup.object().shape({
//         category_name: Yup.string().required("Name is required"),
//         positon: Yup.number().min(0, "must be at least greater than 0").required("Position is required"),
//     });

//     const initialValues: postCategory = {
//         category_name: data?.category_name || "", 
//         positon: data?.positon || "",
//     };

//     const handelSubmit = async (value:postCategory ) => {
//         console.log(value);
//         const postValue = { ... value , parent_category_id:parentCategoryId }
//         if(!id){
//         const status = await postDatacategory(postValue);
//         if (status === 201) {
//         toast.success("success full");
//         handleClose();
//         } else {
//         toast.error("Error :" + status);
//         handleClose();
//         }
//         }else{
//         const updateData= {id:id, updateData : postValue}
//         const status = await updateDataCategory(updateData);
//         if (status === 200) {
//         toast.success("update success full"); 
//         handleClose();
//         } else {
//             toast.error("Error :" + status);
//             handleClose();
//         }
//         }
//     };


//     return (
//         <div>
//         {
//             title == "post" ? 
//             <button
//             onClick={handleOpen}
//             className="py-2 px-6 text-white font-semibold bg-[#1EB91E] hover:bg-[#1EB91E] active:bg-[#1EB91E] duration-200 rounded-lg"
//         >
//             SubCategory Add
//         </button> : 
//         <Button
//             color="inherit"
//             onClick={handleOpen}
//             sx={{ 
//             color: '#767676'
//             }}
//         >
//             <EditIcon  />
//         </Button>
//         }
//         <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={style}>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handelSubmit}
//             >
//                 <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
//                 <h1 className="text-center mb-2 text-[26px] font-bold">
//                     {
//                     title == "post"? "Add a supcategory" : "Edit a supcategory"
//                     }
//                 </h1>
//                 <Field
//                     as={TextField}
//                     label="Category name"
//                     sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
//                     type="text"
//                     name="category_name"
//                     className=" w-[100%]  mb-3 outline-none py-0"
//                     helperText={
//                     <ErrorMessage
//                         name="category_name"
//                         component="p"
//                         className="mb-3 text-red-500 text-center"
//                     />
//                     }
//                 />

//                 <Field
//                     as={TextField}
//                     label="Positon number"
//                     sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
//                     type="number"
//                     name="positon"
//                     className=" w-[100%]  mb-3 outline-none py-0"
//                     helperText={
//                     <ErrorMessage
//                         name="positon"
//                         component="p"
//                         className="mb-3 text-red-500 text-center"
//                     />
//                     }
//                 />
                
//                 <Button
//                     sx={{ fontSize: "16px", fontWeight: "600" ,backgroundColor: "#1EB91E", "&:hover" :{background: "#1EB91E"} }}
//                     variant="contained"
//                     type="submit"
//                     className="w-[100%] py-3"
//                 >
//                     SubCategory Add
//                 </Button>
//                 </Form>
//             </Formik>
//             </Box>
//         </Modal>
//         </div>
//     );
// }
