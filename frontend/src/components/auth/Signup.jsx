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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        // Fullname validation
        if (!input.fullname.trim()) {
            newErrors.fullname = "Full name is required";
        } else if (input.fullname.trim().length < 2) {
            newErrors.fullname = "Name must be at least 2 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(input.email)) {
            newErrors.email = "Invalid email format";
        }

        // Phone validation (10 digits Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!input.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(input.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = "Enter a valid 10-digit Indian mobile number";
        }

        // Password strength validation
        if (!input.password) {
            newErrors.password = "Password is required";
        } else if (input.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(input.password)) {
            newErrors.password = "Password must contain uppercase, lowercase, number & special character";
        }

        // Role validation
        if (!input.role) {
            newErrors.role = "Please select a role";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file && file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return;
        }
        setInput({ ...input, file });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Show first error as toast
            const firstError = Object.values(errors)[0];
            if (firstError) {
                toast.error(firstError);
            }
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname.trim());
        formData.append("email", input.email.trim().toLowerCase());
        formData.append("phoneNumber", input.phoneNumber.replace(/\s/g, ''));
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success("Account created successfully! Please login.");
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally{
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
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name <span className='text-red-500'>*</span></Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            aria-invalid={!!errors.fullname}
                            aria-describedby={errors.fullname ? "fullname-error" : undefined}
                        />
                        {errors.fullname && (
                            <p id="fullname-error" className='text-red-500 text-xs mt-1'>{errors.fullname}</p>
                        )}
                    </div>
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
                        <Label>Phone Number <span className='text-red-500'>*</span></Label>
                        <Input
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="9876543210"
                            maxLength={10}
                            aria-invalid={!!errors.phoneNumber}
                            aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                        />
                        {errors.phoneNumber && (
                            <p id="phone-error" className='text-red-500 text-xs mt-1'>{errors.phoneNumber}</p>
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
                            aria-describedby={errors.password ? "password-error" : "password-hint"}
                        />
                        {errors.password ? (
                            <p id="password-error" className='text-red-500 text-xs mt-1'>{errors.password}</p>
                        ) : (
                            <p id="password-hint" className='text-gray-500 text-xs mt-1'>Min 8 chars with uppercase, lowercase, number & special character</p>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Label className='mb-2 block'>Select Role <span className='text-red-500'>*</span></Label>
                            <RadioGroup className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        id="student-role-signup"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                        aria-invalid={!!errors.role}
                                    />
                                    <Label htmlFor="student-role-signup">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        id="recruiter-role-signup"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                        aria-invalid={!!errors.role}
                                    />
                                    <Label htmlFor="recruiter-role-signup">Recruiter</Label>
                                </div>
                            </RadioGroup>
                            {errors.role && (
                                <p className='text-red-500 text-xs mt-1'>{errors.role}</p>
                            )}
                        </div>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup