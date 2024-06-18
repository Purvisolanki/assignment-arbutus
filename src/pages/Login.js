// import { Button, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/userSlice';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import toast from 'react-hot-toast';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useState } from 'react';

// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogin = (userData) => {
//         const user = {
//             id: 121212,
//             firstname: 'dummyUser',
//             lastname: 'lastname',
//             email: 'dummyuser@gmail.com',
//             number: '7856548512',
//             password: 'Asdf@1234'
//         };
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         if (user) {
//             dispatch(login(user));
//             localStorage.setItem('isLoggedIn', true);
//             toast.success('Login Successful!')
//             navigate('/dashboard');
//         } else {
//             toast.error('Invalid Email or Password!')
//         }
//     };

//     const loginValidationSchema = Yup.object().shape({
//         email: Yup.string()
//             .email('Invalid email address')
//             .required('Email is required'),
//         password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .required('Password is required'),
//     });

//     const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
//         resolver: yupResolver(loginValidationSchema),
//         defaultValues: {
//             email: 'dummyuser@gmail.com',
//             password: 'Asdf@1234',
//         }
//     });

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <Grid container className='h-screen w-full'>
//             <Grid item xs={12} sm={12} md={6}>
//                 <img src='assets/login.png' className='object-cover object-center w-full h-full' alt="Login" />
//             </Grid>
//             <Grid item xs={12} sm={12} md={6} className='flex justify-center items-center'>
//                 <Grid container justifyContent='center' alignItems='center' className='w-full' padding={5}>
//                     <form className='w-full sm:w-2/3 lg:w-3/5' onSubmit={handleSubmit(handleLogin)}>
//                         <Grid item container justifyContent='center' alignItems='center'>
//                             <Typography variant='h4' className='text-lg'>Login</Typography>
//                         </Grid>
//                         <Controller
//                             name="email"
//                             control={control}
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     required
//                                     placeholder='Email'
//                                     id="outlined-required"
//                                     label="Email"
//                                     error={Boolean(errors.email)}
//                                     helperText={errors.email?.message}
//                                     fullWidth
//                                     margin="normal"
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="password"
//                             control={control}
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     required
//                                     placeholder='Password'
//                                     id="outlined-password-input"
//                                     label="Password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     error={Boolean(errors.password)}
//                                     helperText={errors.password?.message}
//                                     fullWidth
//                                     margin="normal"
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <IconButton
//                                                     aria-label="toggle password visibility"
//                                                     onClick={handleClickShowPassword}
//                                                     edge="end"
//                                                 >
//                                                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         ),
//                                     }}
//                                 />
//                             )}
//                         />
//                         <Button
//                             sx={{
//                                 backgroundColor: '#6437B4', marginTop: 2, paddingBlock: 1.3, borderRadius: 2, textTransform: 'capitalize', letterSpacing: '0.1em', "&:hover": {
//                                     backgroundColor: "#621A75", color: '#fff',
//                                 }
//                             }}
//                             type='submit'
//                             variant="contained"
//                             color="primary"
//                             disabled={isSubmitting}
//                             fullWidth
//                         >
//                             Login
//                         </Button>
//                         <Grid item container justifyContent='center' alignItems='center' marginTop={2}>
//                             <span>Don't Have an Account?</span>
//                             <Link to='/register' style={{ color: '#6437B4', fontWeight: 'bold', }}> Register</Link>
//                         </Grid>
//                     </form>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };

// export default Login;


// CONTEXT API CODE 

import { Button, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, users } = useContext(UserContext);

    const handleLogin = (userData) => {
        const user = users.find(user => user.email === userData?.email && user.password === userData?.password);

        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user) {
            login(user);
            localStorage.setItem('isLoggedIn', true);
            toast.success('Login Successful!');
            navigate('/dashboard');
        } else {
            toast.error('Invalid Email or Password!');
        }
    };

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(loginValidationSchema),
        defaultValues: {
            email: 'dummyuser@gmail.com',
            password: 'Asdf@1234',
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Grid container className='h-screen w-full'>
            <Grid item xs={12} sm={12} md={6}>
                <img src='assets/login.png' className='object-cover object-center w-full h-full' alt="Login" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className='flex justify-center items-center'>
                <Grid container justifyContent='center' alignItems='center' className='w-full' padding={5}>
                    <form className='w-full sm:w-2/3 lg:w-3/5' onSubmit={handleSubmit(handleLogin)}>
                        <Grid item container justifyContent='center' alignItems='center'>
                            <Typography variant='h4' className='text-lg'>Login</Typography>
                        </Grid>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    placeholder='Email'
                                    id="outlined-required"
                                    label="Email"
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    placeholder='Password'
                                    id="outlined-password-input"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Button
                            sx={{
                                backgroundColor: '#6437B4', marginTop: 2, paddingBlock: 1.3, borderRadius: 2, textTransform: 'capitalize', letterSpacing: '0.1em', "&:hover": {
                                    backgroundColor: "#621A75", color: '#fff',
                                }
                            }}
                            type='submit'
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                        >
                            Login
                        </Button>
                        <Grid item container justifyContent='center' alignItems='center' marginTop={2}>
                            <span>Don't Have an Account?</span>
                            <Link to='/register' style={{ color: '#6437B4', fontWeight: 'bold', }}> Register</Link>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;

