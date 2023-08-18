"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Toast from '../ToastContainer';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useAuth } from '../../api/context/AuthContext';
import styles from '../Signup/signup.module.css'
import TextField from "@mui/material/TextField";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState()
    const router = useRouter()
    const { signup } = useAuth();

    /** Submit Action Method */
    const submitHandler = async () => {
        if (email.length !== 0 || pass.length !== 0) {
            if (email.length !== 0) {
                let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (mailformat.test(email)) {
                    if (pass.length !== 0) {
                        if (pass.length > 6) {
                            try {
                                await signup(email, pass)
                                toast.success('Signup Success...')
                                router.push(`/src/pages/Dashboard?id=${1}`)
                            }
                            catch (err) {
                                console.log(err);
                                switch (err.code) {
                                    case 'auth/email-already-in-use':
                                        toast.error('User already signup with this account. Please try login');
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

    return (
        <>
            <div className={styles.bg_body}>
                <div className={styles.main_div}>
                    <div className={styles.img_container}>
                        <Toast />
                        <Image
                            src={"/signup.png"}
                            alt="image"
                            width={1000}
                            height={1000}
                            className={styles.img}
                        />
                    </div>
                    <div className={styles.cred_container}>
                        <h1 className={styles.h1_text}>Sign Up</h1>
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
                                Sign Up
                            </button>
                        </div>
                        <div className="pt-3">
                            <p style={{ color: "#7F95CF" }}>Already Have An Account? {" "}

                                <button onClick={() => router.push("/src/pages/Login")} style={{ textDecoration: "none", color: "#7F95CF" }}>Login
                                </button>
                            </p>
                        </div>
                        <div className="pt-2 pb-2  w-75 d-flex flex-row justify-content-center items-center ">
                            <div className="w-50 items-center ml-7">
                                <div style={{ border: "1px solid #ccc" }} />
                            </div>
                            <div>
                                <p className="text-center m-2 " style={{ fontSize: "12px", color: "#aaa" }}>OR</p>
                            </div>
                            <div className="w-50 items-center mr-7">
                                <div style={{ border: "1px solid #ccc" }} />
                            </div>
                        </div>

                        <div className={styles.btn_container}>
                            <button className={styles.login_btn} onClick={() => router.push(`/src/pages/Login?id=${1}`)}>
                                Login With Mobile Number

                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Signup;
