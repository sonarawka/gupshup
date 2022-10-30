import React, { useState, useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import db from "../../Firebase";

const Loginnav = (props) => {
    const [loginuser, setLoginuser] = useState({email:"", password:""})
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
          getDoc(doc(db, "Users", user.email)).then(docSnap => {
            
            if (docSnap.exists()) {
              
              localStorage.setItem("email", user.email);
              localStorage.setItem("USERname", docSnap.data().fullName);
              localStorage.setItem("USERprofile", docSnap.data().profile);
              navigate("/home");
            } else {
              console.log("No such user!");
              // setDoc(doc(db, "users",user.email),{email: user.email,name:user.displayName});
              // navigate("/signup");
              localStorage.setItem("SignupEmail", user.email);
              localStorage.setItem("SignupName", user.displayName);
              props.signupHandler()
            }
          })
          
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
    const inputHandler =(event)=>{
        setLoginuser({...loginuser, [event.target.name]:event.target.value})
        
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        getDoc(doc(db, "Users", loginuser.email)).then(docSnap => {
            if (docSnap.exists()) {
                if(docSnap.data().password===loginuser.password){
                    localStorage.setItem("email", loginuser.email);
                    localStorage.setItem("USERname", docSnap.data().fullName);
                    localStorage.setItem("USERprofile", docSnap.data().profile);
                    navigate("/home");
                    
                }
                else{
                    alert("password incorrect")
                }
             
            } else {
             alert("No such email exist Please check your email or Signup!");
              // setDoc(doc(db, "users",user.email),{email: user.email,name:user.displayName});
              // navigate("/signup");
              setLoginuser({email:'',password:''})
              localStorage.setItem("SignupEmail", loginuser.email);
              localStorage.setItem("SignupName", "");
              props.signupHandler()
            }
          })

    }

    return (
        <div id='loginnav-container'>
            <form className='loginnav-container-form' onSubmit={submitHandler}>
                <input placeholder='Enter Email' type="email" name="email" value={loginuser.email} onChange={inputHandler} />
                <input placeholder='Enter Password' type="password" name="password" value={loginuser.password} onChange={inputHandler} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={signin} className='googlelogin'><img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' />Login</button>
        </div>
    )
}

export default Loginnav