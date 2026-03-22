import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(input.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        if (!input.password) {
            newErrors.password = "Password is required";
        }

        // Role validation
        if (!input.role) {
            newErrors.role = "Please select your role";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            const firstError = Object.values(errors)[0];
            if (firstError) {
                toast.error(firstError);
            }
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, {
                ...input,
                email: input.email.trim().toLowerCase()
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(`Welcome back, ${res.data.user.fullname}!`);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email <span className='text-red-500'>*</span></Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p id="email-error" className='text-red-500 text-xs mt-1'>{errors.email}</p>
                        )}
                    </div>

                    <div className='my-2'>
                        <Label>Password <span className='text-red-500'>*</span></Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                        {errors.password && (
                            <p id="password-error" className='text-red-500 text-xs mt-1'>{errors.password}</p>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Label className='mb-2 block'>Select Role <span className='text-red-500'>*</span></Label>
                            <RadioGroup className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        id="student-role"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                        aria-invalid={!!errors.role}
                                    />
                                    <Label htmlFor="student-role">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        id="recruiter-role"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                        aria-invalid={!!errors.role}
                                    />
                                    <Label htmlFor="recruiter-role">Recruiter</Label>
                                </div>
                            </RadioGroup>
                            {errors.role && (
                                <p className='text-red-500 text-xs mt-1'>{errors.role}</p>
                            )}
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login