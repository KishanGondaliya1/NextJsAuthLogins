"use client";
import styles from '../../src/pages/Signup/signup.module.css'
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Common = () => {
    const router = useRouter();
    return (
        <>
            <div className={styles.bg_body}>
                <div className={styles.main_div}>
                    <div className={styles.img_container}>
                        <Image
                            src={"/rightIcon.png"}
                            alt="image"
                            width={1000}
                            height={1000}
                            className={styles.img}
                        />
                    </div>
                    <div className={styles.cred_container2}>
                        <Image
                            src={"/authenticationIcon.png"}
                            alt="img"
                            width={80}
                            height={80}
                        />
                        <div>
                            <h1 className={styles.h1_text_auth}>Authentication</h1>
                        </div>
                        <div className='w-50 mt-4'>

                            <div className='mb-3'>
                                <button style={{ backgroundColor: '#FFCB2A', borderColor: "#FF9C19" }} className='d-flex flex-row w-100 text-white border border-rounded rounded-3' onClick={() => router.push(
                                    '/src/pages/Signup'
                                )}>
                                    <div style={{ backgroundColor: "gray", opacity: 0.4 }} >
                                        <Image src={"/firebaseIcon.png"} alt="img" width={40} height={30} className='justify-constent-center' />
                                    </div>

                                    <p style={{ alignSelf: "center", fontSize: "13px" }} className='text-center mb-0 text-uppercase pl-1'>Login with Firebase</p>
                                </button>
                            </div>
                            <div className='mb-3'>
                                <button style={{ backgroundColor: '#FF9C19', borderColor: "#FF9C19" }} className='d-flex flex-row  w-100 text-white border border-rounded rounded-3  '>
                                    <div style={{ backgroundColor: "gray", opacity: 0.4 }} >
                                        <Image src={"/aws.png"} alt="img" width={40} height={30} className='justify-constent-center' />
                                    </div>

                                    <p style={{ alignSelf: "center", fontSize: "13px" }} className=' mr-5 p-1 mb-0 text-uppercase'>Login with AWS cognito</p>
                                </button>
                            </div>
                            <div className='mb-3'>
                                <button style={{ backgroundColor: 'gray', borderColor: "#FF9C19" }} className='d-flex flex-row w-100 text-white border border-rounded rounded-3  '>
                                    <div style={{ backgroundColor: "black", opacity: 0.4 }} >
                                        <Image src={"/githubIcon.png"} alt="img" width={40} height={30} className='justify-constent-center' />
                                    </div>

                                    <p style={{ alignSelf: "center", fontSize: "13px" }} className=' mr-5 p-1 mb-0 text-uppercase'>Login with Github</p>
                                </button>
                            </div>

                            <div className='mb-3'>
                                <button style={{ backgroundColor: '#658c5f', borderColor: "#FF9C19" }} className='d-flex flex-row w-100 text-white border border-rounded rounded-3 '>
                                    <div style={{ backgroundColor: "#008CAC", opacity: 0.4 }} >
                                        <Image src={"/keycloakIcon.png"} alt="img" width={40} height={30} className='justify-constent-center' />
                                    </div>

                                    <p style={{ alignSelf: "center", fontSize: "13px" }} className=' mr-5 p-1 mb-0 text-uppercase'>Login with KeyCloak</p>
                                </button>
                            </div>

                            <div>
                                <button style={{ backgroundColor: '#5a9da6', borderColor: "#FF9C19" }} className='d-flex w-100 flex-row text-white border border-rounded rounded-3'>
                                    <div style={{ backgroundColor: "gray", opacity: 0.6 }} >
                                        <Image src={"/oauth.png"} alt="img" width={40} height={30} className='justify-constent-center' />
                                    </div>

                                    <p style={{ alignSelf: "center", fontSize: "13px" }} className=' mr-5 p-1 mb-0 text-uppercase pl-5'>Login with OAuth</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};

export default Common;


