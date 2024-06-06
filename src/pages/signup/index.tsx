import { Signup } from "@authInterface"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Notification } from "../../utils/notification"
// import { setDataToCookie } from "@data-service"
import { Button,Grid, IconButton, InputAdornment, TextField, Typography,Link } from "@mui/material"
import { Formik,Form, Field, ErrorMessage } from "formik"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { signUpValidationSchema } from "../../utils/validations"
import auth from "@servicesAuth"
import { useMask } from "@react-input/mask"
import Logo from "../../assets/icon/TexnoArkLogo.svg"



const Index = () => {
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const initialValues:Signup = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
    }

    const inputRef = useMask({
        mask: "+998 (__) ___-__-__",
        replacement: { _: /\d/ },
    });

    const handleSubmit = async(values:Signup) =>{
        try {
            const formattedphone_number = values.phone_number.replace(/[\s()-]/g, '');
            const formattedValues = {
                ...values,
                phone_number: formattedphone_number,
            };
            const response = await auth.signup(formattedValues)
            if (response.status === 201) {
                Notification({title:"Tizimga muvaffaqiyatli kirdingiz",type:"success"})
                setTimeout(()=>{navigate("/")},1000)
            }
        } catch (error) {
            console.log(error)
            Notification({title:"Tizimga kirishda xatolik",type:"error"})
        }
    }

    return (
        <>
            <ToastContainer/>  
            <div className="h-screen flex items-center justify-center flex-col gap-8 p-5  bg-[#F0F0F0]">
                {/* <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">Tizimga kirish</h1> */} 
                    
                <div className="max-w-[400px] h-[650px] bg-[#fff] p-5 shadow-2xl rounded-[7px]">
                    <div className="flex items-center justify-center">
                        <img src={Logo} className="mr-2 mt-3"/>
                        <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[45px]">TexnoArk</h1>
                    </div>
                    <Typography component="h6" variant="h6" className="text-center">
                            SIGN UP
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpValidationSchema}
                        onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Field
                                        name="first_name"
                                        type="text"
                                        as={TextField}
                                        label="First Name"
                                        className="w-full"
                                        margin="normal"
                                        variant="outlined"
                                        helperText={
                                            <ErrorMessage
                                                name="first_name"
                                                component="p"
                                                className="text-red-500 text-[15px]"
                                            />
                                        }   
                                    />
                                    <Field
                                        name="last_name"
                                        type="text"
                                        as={TextField}
                                        label="Last Name"
                                        className="w-full"
                                        margin="normal"
                                        variant="outlined"
                                        helperText={
                                            <ErrorMessage
                                                name="last_name"
                                                component="p"
                                                className="text-red-500 text-[15px]"
                                            />
                                        }   
                                    />
                                    <Field
                                        name="phone_number"
                                        type="text"
                                        as={TextField}
                                        label="Phone Number"
                                        className="w-full"
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={inputRef}
                                        helperText={
                                            <ErrorMessage
                                                name="phone_number"
                                                component="p"
                                                className="text-red-500 text-[15px]"
                                            />
                                        }   
                                    />
                                    <Field
                                        name="email"
                                        type="email"
                                        as={TextField}
                                        label="Email"
                                        className="w-full"
                                        margin="normal"
                                        variant="outlined"
                                        helperText={
                                            <ErrorMessage
                                                name="email"
                                                component="p"
                                                className="text-red-500 text-[15px]"
                                            />
                                        }   
                                    />
                                    <Field
                                        name="password"
                                        type={showPassword ? 'text' : "password"}
                                        as={TextField}
                                        label="Parol"
                                        className="w-full"
                                        margin="normal"
                                        variant="outlined"
                                        helperText={
                                            <ErrorMessage 
                                                name="password"
                                                component="p"
                                                className="text-red-500 text-[15px]"
                                            />
                                        }
                                        InputProps={{
                                            endAdornment:(
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Grid container>
                                        <Grid item>
                                        </Grid>
                                        <Grid item>
                                        <Link onClick={() => navigate("/")} variant="body2">
                                            {"Don't have an account? Sign In"}
                                        </Link>
                                        </Grid>
                                    </Grid>
                                        <Button
                                        type="submit" 
                                        variant="contained" 
                                        // color="primary"
                                        sx={{
                                            bgcolor: '#F07427',
                                            transition: 'all 0.5s ease',
                                            mt: 2,
                                            mb: 2,
                                            ":hover": {
                                                bgcolor: '#D55200',
                                                transition: 'all 0.5s ease',
                                                transform: 'scale(1)'
                                            }
                                        }}
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        {isSubmitting ? "Submitting" : "Submit"}
                                    </Button>
                                    
                                </Form>
                            )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Index
