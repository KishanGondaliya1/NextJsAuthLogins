'use-client';
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from "../config/firebase";
import 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [confirmObj, setConfrimObj] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    useruid: user.id,
                    email: user.email,
                    displayName: user.displayName
                })
            }
            else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsubcribe()
    }, [])

    /** Managing Captcha */
    const recaptcha = async (number) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal'
        });
        const formattedNumber = `+${number.replace(/[^\d]/g, "")}`;
        console.log(formattedNumber, "formtt");
        recaptchaVerifier.render()
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, recaptchaVerifier)
            setConfrimObj(confirmationResult)
            console.log('confirmrrrr', confirmationResult);
            return confirmationResult;
        }
        catch (error) {
            throw error;
        }
    };

    /** Verify OTP Action Method */
    const verifyotp = (otp) => {
        console.log(otp, "otpp");
        let abc = confirmObj.confirm(auth, otp)
        console.log(abc, "abbccc");
    }

    /** Signup Action Method */
    const signup = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    /** Login Action Method */
    const login = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    /** logout Action Method */
    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, recaptcha, verifyotp }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
