import { SignIn } from "@authInterface"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Notification } from "../../utils/notification"
import { setDataToCookie } from "@data-service"
import { Button,Grid, IconButton, InputAdornment, TextField, Typography,Link } from "@mui/material"
import { Formik,Form, Field, ErrorMessage } from "formik"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { signInValidationSchema } from "../../utils/validations"
import auth from "@servicesAuth"
import Logo from "../../assets/icon/TexnoArkLogo.svg"



const Index = () => {

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const initialValues:SignIn = {
        email: "",
        password: "",
    }

    const handleSubmit = async(values:SignIn) =>{
        try {
            const response = await auth.sign_in(values)
            if (response.status === 201) {
                setDataToCookie("admin_id", response?.data?.admin?.id);
                setDataToCookie("token",response?.data?.tokens?.access_token)
                Notification({title:"Tizimga muvaffaqiyatli kirdingiz",type:"success"})
                setTimeout(()=>{navigate("/main")},1000)
            }
        } catch (error) {
            console.log(error)
            Notification({title:"Tizimga kirishda xatolik",type:"error"})
        }
    }

    return (
        <>
            <ToastContainer/>  
            <div className="h-screen flex items-center justify-center flex-col gap-8 p-5 bg-[#F0F0F0]">
                {/* <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">Tizimga kirish</h1> */} 
                    
                <div className="max-w-[400px] h-[400px] bg-[#fff] p-5 shadow-2xl rounded-[7px]">
                    <div className="flex items-center justify-center">
                        <img src={Logo} className="mr-2 mt-3"/>
                        <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[45px]">TexnoArk</h1>
                    </div>
                    <Typography component="h6" variant="h6" className="text-center">
                            SIGN IN
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signInValidationSchema}
                        onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
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
                                        <Link onClick={() => navigate("/signup")} variant="body2">
                                            {"Don't have an account? Sign Up"}
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
