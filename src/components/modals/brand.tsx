import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import useBrandStore from "../../store/brand-store";
import { postData } from "../../interface/brand";
import { brandValidationSchema } from "../../utils/validations";
import useCategoryStore from "../../store/category-store";

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
  id?: number | string;
  data?: any;
}

export default function BasicModal({ title, id, data }: PropsData) {
  const { postBrand } = useBrandStore();
  const { getDataCategory, dataCategory } = useCategoryStore();
  // console.log(dataCategory, "ddffdfddddddddddd");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    getDataCategory({ limit: 10, page: 1 });
    // console.log(dataCategory,"testsetssvcct");
    
  }, []);

  const initialValues: postData = {
    name: data?.brand_name || "",
    description: data?.brand_description || "",
    category_id: data?.position || "",
    file: undefined,
  };

  const handleSubmit = async (values: postData) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category_id", values.category_id);
    if (values.file) {
      formData.append("file", values.file);
    }

    let status;
    if (!id) {
      status = await postBrand(formData);
    } else {
      // const updateData = { id: id, putData: formData };
      // status = await updateBrand(updateData);
    }

    if (status === 201 || status === 200) {
      toast.success(
        title === "post" ? "Successfully added" : "Successfully updated"
      );
      handleClose();
    } else {
      toast.error("Error: " + status);
      handleClose();
    }
  };

  return (
    <div>
      {title === "post" ? (
        <button
          onClick={handleOpen}
          className="py-2 px-6 text-white font-semibold bg-[#1EB91E] hover:bg-[#1EB91E] active:bg-[#1EB91E] duration-200 rounded-lg"
        >
          Brand add
        </button>
      ) : (
        <Button color="inherit" onClick={handleOpen} sx={{ color: "#767676" }}>
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
            validationSchema={brandValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
                <h1 className="text-center mb-2 text-[26px] font-bold">
                  {title === "post" ? "Add a brand" : "Edit a brand"}
                </h1>
                <Field
                  as={TextField}
                  label="Brand name"
                  sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
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
                  label="Brand description"
                  sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                  type="text"
                  name="description"
                  className="w-[100%] mb-3 outline-none py-0"
                  helperText={
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="mb-3 text-red-500 text-center"
                    />
                  }
                />
                <Field
                  name="category_id"
                  type="text"
                  as={TextField}
                  label="Category"
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
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Field>
                <input
                  type="file"
                  name="file"
                  className="w-[100%] mb-3 outline-none py-0"
                  onChange={(event: any) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="file"
                  component="div"
                  className="mb-3 text-red-500 text-center"
                />
                <Button
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    backgroundColor: "#1EB91E",
                    "&:hover": { background: "#1EB91E" },
                  }}
                  variant="contained"
                  type="submit"
                  className="w-[100%] py-3"
                >
                  {title === "post" ? "Add" : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
