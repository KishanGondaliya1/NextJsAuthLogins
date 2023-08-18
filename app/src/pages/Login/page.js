"use client";

import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from "next/image";
import PhoneInput from 'react-phone-input-2'
import { useRouter } from "next/navigation";
import { useAuth } from '../../api/context/AuthContext';
import styles from '../Login/login.module.css'
import TextField from "@mui/material/TextField";
import 'react-phone-input-2/lib/style.css'
import Toast from '../ToastContainer';
import { toast } from 'react-toastify';

const Login = (params) => {
    const id = params.searchParams.id;
    const [email, setEmail] = useState("");
    const [flag, setFlag] = useState(true)
    const [pass, setPass] = useState()
    const [number, setNumber] = useState("")
    const [otp, setOtp] = useState("")
    const router = useRouter()
    const [toggle, setToggle] = useState(false)
    const { login, recaptcha, verifyotp } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setToggle(true)
        }, 2000);
        return () => clearTimeout(timer);
    }, [flag, toggle])

    /** Submit handler and manage validation */
    const submitHandler = async () => {
        if (email.length !== 0 || pass.length !== 0) {

            if (email.length !== 0) {
                let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (mailformat.test(email)) {
                    if (pass.length !== 0) {
                        if (pass.length > 6) {
                            try {
                                await login(email, pass)
                                toast.success('Login Success...')
                                router.push('/src/pages/Dashboard')
                            }
                            catch (err) {
                                console.log(err);
                                switch (err.code) {
                                    case 'auth/user-not-found':
                                        toast.error('User not found ! Please enter a vaild email ');
                                        break;
                                    case 'auth/wrong-password':
                                        toast.error('Please enter a vaild password');
                                        break;
                                }
                            }
                        }
                        else {
                            toast.error("Password should be at least 6 characters");
                        }
                    }
                    else {
                        toast.error("Please enter password")
                    }
                }
                else { toast.error('Please enter a vaild email'); }
            }
            else {
                toast.error("Please enter email")
            }
        }
        else {
            toast.error('Please enter email and password');
        }
    }

    /** Send OTP Action Method */
    const handleSendOTP = async () => {
        console.log(number, "nnn");
        if (number.length !== 'undefined') {
            let phoneno = /^\d{12}$/;
            if (phoneno.test(number)) {
                try {
                    setFlag(false)
                    await recaptcha(number).then((res) => res ? setToggle(true) : null)
                }
                catch (err) {
                    console.log(err);
                    switch (err.code) {
                        case 'auth/invalid-value-(code)':
                            toast.error('Please Enter Vaild OTP');
                            break;
                        case 'auth/too-many-requests':
                            toast.error('stop Sending OTP firebase server limit is over  ');
                            break;
                    }
                }
            }
            else {
                toast.error("Please enter 10 digits mobile number")
            }
        }
        else {

            toast.error("Please enter mobile number")
        }
    };

    /** Handle Verify Otp */
    const handleverifyotp = async () => {
        console.log(otp, "otp");
        if (otp.length !== 0) {
            if (otp.length >= 6) {

                try {
                    await verifyotp(otp)
                    toast.success('Verify Success...')
                    router.push('/src/pages/Dashboard')
                }
                catch (err) {
                    console.log(err);
                    switch (err.code) {
                        case 'auth/invalid-value-(code)':
                            toast.error('Please Enter Vaild OTP');
                            break;
                        case 'auth/too-many-requests':
                            toast.error('stop Sending OTP firebase server limit is over  ');
                            break;
                        default:
                            toast.error('Please login after sometime')
                    }
                }
            }
            else {
                toast.error("Please enter 6 digits OTP")
            }
        }
        else {
            toast.error("Please enter OTP")
        }
    }

    return (
        <>
            <div className={styles.bg_body}>
                <div className={styles.main_div}>
                    <div className={styles.img_container}>
                        <Toast />
                        <Image
                            src={"/loginBackimg.png"}
                            alt="image"
                            width={1000}
                            height={1000}
                            className={styles.img}
                        />
                    </div>
                    {id ?
                        <div className={styles.cred_container}>
                            <h1 className={styles.h1_text}>Sign In With Mobile Number</h1>
                            <div className='mt-5'>
                                <PhoneInput
                                    country={'us'}
                                    rules={{ required: true }}
                                    onChange={(e) => setNumber(e)}
                                    value={number ? number : null}
                                />
                            </div>

                            <div className={styles.btn_container}>
                                {flag ?
                                    <button className={styles.login_btn} onClick={handleSendOTP}>
                                        Send OTP
                                    </button>
                                    :
                                    <button className={styles.login_btn} onClick={handleSendOTP}>
                                        Resend OTP
                                    </button>
                                }
                            </div>
                            {toggle ?
                                <div id="recaptcha-container" className="pt-1" />
                                : null
                            }

                            <div className=' w-100'>
                                <div className={styles.input_container}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter OTP"
                                        variant="outlined"
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <div className={styles.btn_container}>
                                    <button className={styles.login_btn} onClick={handleverifyotp}>
                                        Verify OTP
                                    </button>
                                </div>

                                <div className={styles.btn_container}>
                                    <button className={styles.login_btn} onClick={() => router.push('/src/pages/Signup')}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.cred_container}>
                            <h1 className={styles.h1_text}>Sign In</h1>
                            <div className={styles.input_container}>
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    type={"password"}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                            <div className={styles.btn_container}>
                                <button className={styles.login_btn} onClick={submitHandler} >
                                    Sign In
                                </button>
                            </div>
                            <div className={styles.btn_container}>
                                <button className={styles.login_btn} onClick={() => router.push('/src/pages/Signup')}>
                                    Back
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div >
        </>
    );
};

export default Login;
