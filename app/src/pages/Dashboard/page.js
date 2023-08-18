"use client";
import styles from '../Dashboard/dashboard.module.css'
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Dashboard = (params) => {
    const id = params.searchParams.id;
    const router = useRouter();

    return (
        <>
            <div className={styles.bg_body}>
                <div className={styles.main_div}>
                    <div className='justify-content-center'>
                        <div className='items-center pb-3'>
                            <Image src="/successIcon.png" width={40} height={40} alt="img" style={{ alignItems: "center", marginInline: "auto", marginTop: "-20px" }} />
                        </div>
                        <div>
                            <h4 className="text-center">{id ? "Signup success!" : "Login success!"}</h4>
                        </div>
                        {
                            id === 0 ?
                                <div className='items-center pl-2'>
                                    <button onClick={() => router.push('/src/pages/Login')} className='text-center'>back to login page</button>
                                </div>
                                :

                                <div className='items-center pl-2'>
                                    <button onClick={() => router.push('/src/pages/Signup')} className='text-center'>back to signup page</button>
                                </div>
                        }
                    </div>
                </div>
            </div >
        </>
    );
};

export default Dashboard;
