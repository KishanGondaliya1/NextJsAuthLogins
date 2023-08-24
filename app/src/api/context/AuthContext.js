"use-client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  getCodeFromUserInput,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../config/firebase";
import "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [confirmObj, setConfrimObj] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          useruid: user.id,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubcribe();
  }, []);

  /** Managing Captcha */
  const recaptcha = async (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
      }
    );
    const formattedNumber = `+${number.replace(/[^\d]/g, "")}`;
    recaptchaVerifier.render();
    // Adjust the time as needed
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        recaptchaVerifier
      );
      setConfrimObj(confirmationResult);
      return confirmationResult;
    } catch (error) {
      recaptchaVerifier.clear();
      throw error;
    }
  };
  // ; recaptchaVerifier.clear()
  /** Verify OTP Action Method */

  const verifyotp = async (otp) => {
    try {
      let res = await confirmObj.confirm(otp);
      return res;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  };
  /** Signup Action Method */
  const signup = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  /** Login Action Method */
  const login = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  /** logout Action Method */
  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, recaptcha, verifyotp }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
