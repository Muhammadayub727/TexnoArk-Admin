import * as Yup from "yup";

//------------------|REGISTER|----------------//
export const signUpValidationSchema = Yup.object({
        first_name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
        last_name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
        phone_number: Yup.string().required("Phone Number is required"), 
        email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
});

//------------------|LOGIN|------------------//
export const signInValidationSchema = Yup.object({
        phone_number: Yup.string().required("Phone Number is required"),
        password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
});

//-----------------BRAND-----------------------//
export const brandValidationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        category_id: Yup.number().min(0, "must be at least greater than 0").required("Position is required"),
        file: Yup.string().required("Image is required")
});

export const brandValidationSchemaUpdete = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        categoryId: Yup.number().min(0, "must be at least greater than 0").required("Position is required")
});


//-----------------Br-Category----------------//
export const brandCategoryValidationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        brand_id: Yup.number().min(0, "must be at least greater than 0"),
});
//----------------Pr-Detail------------------//
export const productDetailValidationSchema = Yup.object().shape({
        quantity: Yup.number().min(0, "must be at least greater than 0").required("Price is required"),
        description: Yup.string().required("Description is required"),
        discount: Yup.number().min(0, "must be at least greater than 0").required("Price is required"),
        color: Yup.string().required("Position is required"),
        file: Yup.string().required("Image is required")
});