import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import useBrandStore from "../../store/brand-store";
import {postData} from "../../interface/brand"
import {brandValidationSchema} from "../../utils/validations"


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
    id?: number;
    data?: any;
    }

    export default function BasicModal({title , id , data}:propsData) {
    const { postBrand , updateBrand} = useBrandStore();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /// my code start <-----------------------------

    const initialValues: postData = {
        brand_name: data?.brand_name || "",
        brand_description: data?.brand_description || "" ,
        position: data?.position || "" ,
        image: data?.image || ""  
    };

    const handelSubmit = async (value:postData ) => {
        if(!id){
        const status = await postBrand(value);
        if (status === 201) {
        toast.success("success full");
        handleClose();
        } else {
        toast.error("Error :" + status);
        handleClose();
        }
        }else{
        const updateData= {id:id, putData : value}
        const status = await updateBrand(updateData);
        if (status === 200) {
        toast.success("update success full"); 
        handleClose();
        } else {
        toast.error("Error :" + status);
        handleClose();
        }
        }
    };

    // my code end <--------------------------------

    return (
        <div>
        {
            title == "post" ? 
            <button
            onClick={handleOpen}
            className="py-2 px-6 text-white font-semibold bg-[#D52200] hover:bg-[#9c4837] active:bg-[#D52200] duration-200 rounded-lg"
        >
            To add
        </button> : 
        <Button
            color="inherit"
            onClick={handleOpen}
            sx={{ 
            color: '#767676' // HEX formatida rang
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
                validationSchema={brandValidationSchema}
                onSubmit={handelSubmit}
            >
                <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
                <h1 className="text-center mb-2 text-[26px] font-bold">
                    {
                    title == "post"? "Add a brand" : "Edit a brand"
                    }
                </h1>
                <Field
                    as={TextField}
                    label="Brand name"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="brand_name"
                    className=" w-[100%]  mb-3 outline-none py-0"
                    helperText={
                    <ErrorMessage
                        name="brand_name"
                        component="p"
                        className="mb-3 text-red-500 text-center"
                    />
                    }
                />
                <Field
                    as={TextField}
                    label="Brand description"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="brand_description"
                    className=" w-[100%]  mb-3 outline-none py-0"
                    helperText={
                    <ErrorMessage
                        name="brand_description"
                        component="p"
                        className="mb-3 text-red-500 text-center"
                    />
                    }
                />

                <Field
                    as={TextField}
                    label="Position"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="number"
                    name="position"
                    className=" w-[100%]  mb-3 outline-none py-0"
                    helperText={
                    <ErrorMessage
                        name="position"
                        component="p"
                        className="mb-3 text-red-500 text-center"
                    />
                    }
                />

                <Field
                    as={TextField}
                    label="Image URL"
                    sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                    type="text"
                    name="image"
                    className=" w-[100%]  mb-3 outline-none py-0"
                    helperText={
                    <ErrorMessage
                        name="image"
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
                    to add
                </Button>
                </Form>
            </Formik>
            </Box>
        </Modal>
        </div>
    );
}
