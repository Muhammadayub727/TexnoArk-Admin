import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import useCategoryStore from "../../store/category-store";
import {postCategory} from "../../interface/category"


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
    
    export default function BasicModal({title , id , data}:propsData) {
        const { postDatacategory , updateDataCategory } = useCategoryStore();
    
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    
    
    
        const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        });
    
        const initialValues: postCategory = {
        name: data?.name || "", 
        };
    
        const handelSubmit = async (value:postCategory ) => {
        if(!id){
            const status = await postDatacategory(value);
            if (status === 201) {
            toast.success("success full");
            handleClose();
            } else {
            toast.error("Error :" + status);
            handleClose();
            }
        }else{
            const updateData= {id:id, updateData : value}
            const status = await updateDataCategory(updateData);
            if (status === 200) {
            toast.success("update success full"); 
            handleClose();
            } else {
                toast.error("Error :" + status);
                handleClose();
            }
            }
        };
    
    
        return (
        <div>
            {
            title == "post" ? 
            <button
            onClick={handleOpen}
            className="py-2 px-6 text-white font-semibold bg-[#1EB91E] hover:bg-[#1EB91E] active:bg-[#1EB91E] duration-200 rounded-lg"
            >
            Category Add
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
                        title == "post"? "Add a category" : "Edit a category"
                    }
                    </h1>
                    <Field
                    as={TextField}
                    label="Category name"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="name"
                    className=" w-[100%]  mb-3 outline-none py-0"
                    helperText={
                        <ErrorMessage
                        name="name"
                        component="p"
                        className="mb-3 text-red-500 text-center"
                        />
                    }
                    />
                    
                    <Button
                    sx={{ fontSize: "16px", fontWeight: "600" ,backgroundColor: "#1EB91E", "&:hover" :{background: "#1EB91E"} }}
                    variant="contained"
                    type="submit"
                    className="w-[100%] py-3"
                    >
                    Category Add
                    </Button>
                </Form>
                </Formik>
            </Box>
            </Modal>
        </div>
        );
    }
    