import React,{useEffect} from 'react'
import './Login.css'
import img from '../favicon1.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const signin =()=>{
    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        localStorage.setItem("email", user.email)
        localStorage.setItem("USERname", user.displayName)
        localStorage.setItem("USERprofile", user.photoURL)
        navigate('/home')
        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  useEffect(() => {
    if(localStorage.getItem("email")){
      navigate('/home')
    }
  }, [])
  
  return (
    <div className='login-container'>
        <img  src={img}/>
        <h2 className='login-heading'>Gupshup</h2>
        <button onClick={signin} className='login-btn'>Login with Google</button>
    </div>
  )
}

export default Login