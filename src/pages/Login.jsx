// import { useAuthState } from "react-firebase-hooks/auth";
// import SignUp from '../pages/SignUp';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../comp/header";
import Footer from "../comp/Footer";
import '../index.css';
import '../theme.css';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../fireBase/config';
import { useState } from 'react';
import "./ForgotPassword.css";
import Modal from '../shared/Modal';
import { sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from 'react-i18next';


const Login = () => {
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [resetPass, setresetPass] = useState(null);
  const [HasError, setHasError] = useState(false);
  const [ErrorLogin, setErrorLogin] = useState(null);
  const [check, setcheck] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();
  const {i18n } = useTranslation();


// <<<<<<<<<<<  <functions>  >>>>>>>>>>>>>>>>
// const linkResetPassword = () => {
//   setshowModal("show-forgotPassword")
// }
const closeIcon = () => {
  setshowModal(false)
}
// This function is for icon close in the forgot password form
const modal = () => {
  setshowModal(true)
}
// This function for the reset password link to do new password if you are loss it
const resetBtn = (eo) => {
  eo.preventDefault()
      sendPasswordResetEmail(auth, resetPass)
      .then(() => {
      setcheck("Please check your email to reset your password 🙂");
      })
      .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ..
      });
}
// This function is for the login button ...
const loginBtn = (eo) => {
  eo.preventDefault()
            signInWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
              // Signed in 
              // const user = userCredential.user;
              navigate('/')
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              // const errorMessage = error.message;
              switch (errorCode) {
                case  "auth/missing-email" :
                  setErrorLogin("Email or password is empty !!")
                  break;
                case "auth/invalid-email" :
                  setErrorLogin("Email is not correct !!")
                  break;
                case "auth/internal-error" :
                  setErrorLogin("Password is empty !!")
                  break;
                case "auth/user-not-found" :
                  setErrorLogin("User is not found !!")
                  break;
                case "auth/wrong-password" :
                  setErrorLogin("Wrong password !!")
                  break;
                case "auth/too-many-requests" :
                  setErrorLogin("Too many requests!! , Pleas try again")
                  break;
                default:
                  setErrorLogin(errorCode)
                  break;
              }
              // setErrorLogin(errorCode)
              setHasError(true)
            })
}
// This function for get the value in the password input
const passwordValue = (eo) => {
  setPassword(eo.target.value)
}
// This function for get the value in the email input
const emailValue = (eo) => {
  setEmail(eo.target.value)
}
// <<<<<<<<<<<<<<  end functions  >>>>>>>>>>>>>>>>>>>>>
  return (
    <div  className='login'>
      <Header />
      <main>
{/* <<<<<<<<< This is for forgote password form >>>>>>>>>>>>>>*/}
    {showModal &&   
        <Modal closeIcon={closeIcon} >
            <input onChange={(eo) => {
                setresetPass(eo.target.value)
              }}
                  type="email"
                  placeholder="Enter your email :"
                  required
                />
              <button onClick={(eo) => {
                  resetBtn(eo)
                }}>Reset Password</button>
              <p className="msgResetEmail">{check}</p>
        </Modal>
    }
{/* <<<<<<<<<<<This is for login form >>>>>>>>>>>>>*/}
        <form>
          <input onChange={(eo) => {
            emailValue(eo)
          }} type="email" placeholder='Enter your Email' required />
          <input onChange={(eo) => {
            passwordValue(eo)
          }} type="password" placeholder='Enter your Password' required />
          <button dir='auto' onClick={(eo) => {
            loginBtn(eo)
          }}>
            {i18n.language === "en" && "Login"}
            {i18n.language === "ar" && "تسجيل الدخول"}
            </button>          
          <p dir='auto' className="account" >
            {i18n.language === "en" && "  Are you don't have an account "}
            {i18n.language === "ar" && " هل ليس لديك حساب "}
            <Link className='link' to="/SignUp">Sign Up</Link>
          </p>
          
          <p dir='auto' onClick={() => {
            modal()
          }} className='resetParagraph'>
            {i18n.language === "en" && "Reset Password"}
            {i18n.language === "ar" && "إعادة تعيين كلمة المرور"}
          </p>
          {HasError && <p className='errorParagraph'> Oops! {ErrorLogin}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
