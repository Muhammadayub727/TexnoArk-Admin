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
        PhoneNumber: Yup.string().required("Phone Number is required"),
        password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
});

//-----------------BRAND-----------------------//
export const brandValidationSchema = Yup.object().shape({
        brand_name: Yup.string().required("Name is required"),
        brand_description: Yup.string().required("Description is required"),
        position: Yup.number().min(0, "must be at least greater than 0").required("Position is required"),
        image: Yup.string().required("Image is required"),
});

