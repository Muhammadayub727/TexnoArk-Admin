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
import useProductStore from "../../store/product-store";
import useBrandCategoryStore from "../../store/brand-category";
import { postData } from "../../interface/brand-category";

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

interface PropsData {
    title: string;
    id?: string;
    data?: any;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().min(0, "must be at least greater than 0"),
    category_id: Yup.number().min(0, "must be at least greater than 0").required("Category ID is required"),
    brand_category_id: Yup.number().min(0, "must be at least greater than 0").required("Brand Category ID is required"),
    brand_id: Yup.number().min(0, "must be at least greater than 0").required("Brand ID is required"),
});

const ModalProduct: React.FC<PropsData> = ({ title, id, data }: PropsData) => {
    const { postProduct, updateProduct } = useProductStore();
    const { getDataCategory, dataCategory } = useCategoryStore();
    const { getCategoryId, dataBrandsId } = useBrandStore();
    const { getCategoryBrandId, dataBrandCategoryId } = useBrandCategoryStore();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getDataCategory({ search: "", limit: 1000, page: 1 });
    }, [getDataCategory]);

    const initialValues: postData = {
        name: data?.name || "", // Ensure it's a string
        price: data?.price || 0, // Ensure it's a number
        brand_id: data?.brand_id || 0, // Ensure it's a number
        brand_category_id: data?.brand_category_id || 0, // Ensure it's a number
        category_id: data?.category_id || 0, // Ensure it's a number
    };

    const handleSubmit = async (values: postData) => {
        let status;
        if (!id) {
            status = await postProduct(values);
            if (status === 201) {
                toast.success("Successfully added");
            } else {
                toast.error("Error: " + status);
            }
        } else {
            const updateData = { id, putData: values };
            status = await updateProduct(updateData);
            if (status === 200) {
                toast.success("Successfully updated");
            } else {
                toast.error("Error: " + status);
            }
        }
        handleClose();
    };

    const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
        const id = event.target.value as number;
        getCategoryId({ id });
    };

    const handleChangeBrand = (event: React.ChangeEvent<{ value: unknown }>) => {
        const id = event.target.value as number;
        getCategoryBrandId({ id });
    };

    return (
        <div>
            {title === "post" ? (
                <button
                    onClick={handleOpen}
                    className="py-2 px-6 text-white font-semibold bg-[#1EB91E] hover:bg-[#1EB91E] active:bg-[#1EB91E] duration-200 rounded-lg"
                >
                    Add
                </button>
            ) : (
                <Button
                    color="inherit"
                    onClick={handleOpen}
                    sx={{ color: '#767676' }}
                >
                    <EditIcon />
                </Button>
            )}
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
                        onSubmit={handleSubmit}
                    >
                        <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
                            <h1 className="text-center mb-2 text-[26px] font-bold">
                                {title === "post" ? "Add a product" : "Edit a product"}
                            </h1>

                            <Field
                                name="category_id"
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
                                onChange={handleChangeCategory}
                            >
                                {dataCategory?.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Field>

                            <Field
                                name="brand_id"
                                type="text"
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
                                        component="p"
                                        className="text-[red] text-[15px]"
                                    />
                                }
                                onChange={handleChangeBrand}
                            >
                                {dataBrandsId?.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Field>

                            <Field
                                name="brand_category_id"
                                type="text"
                                as={TextField}
                                label="Brand Category ID"
                                select
                                className="relative"
                                margin="none"
                                variant="outlined"
                                fullWidth
                                helperText={
                                    <ErrorMessage
                                        name="brand_category_id"
                                        component="p"
                                        className="text-[red] text-[15px]"
                                    />
                                }
                            >
                                {dataBrandCategoryId?.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Field>

                            <Field
                                as={TextField}
                                label="Product Name"
                                sx={{ "& input": { color: "#000000", fontSize: "20px" } }}
                                type="text"
                                name="name"
                                className="w-[100%] mb-3 outline-none py-0"
                                helperText={
                                    <ErrorMessage
                                        name="name"
                                        component="p"
                                        className="mb-3 text-red-500 text-center"
                                    />
                                }
                            />
                            <Field
                                as={TextField}
                                label="Price"
                                sx={{ "& input": { color: "#000000", fontSize: "20px" } }}
                                type="number"
                                name="price"
                                className="w-[100%] mb-3 outline-none py-0"
                                helperText={
                                    <ErrorMessage
                                        name="price"
                                        component="p"
                                        className="mb-3 text-red-500 text-center"
                                    />
                                }
                            />

                            <Button
                                sx={{ fontSize: "16px", fontWeight: "600", backgroundColor: "#1EB91E", "&:hover": { background: "#1EB91E" } }}
                                variant="contained"
                                type="submit"
                                className="w-[100%] py-3"
                            >
                                {title === "post" ? "Add" : "Update"}
                            </Button>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalProduct;

