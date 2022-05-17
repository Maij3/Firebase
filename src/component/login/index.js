import React, {
    useState
} from "react";
import "./login.css";
import {
    auth
} from "../../firebase/firebaseConfig"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth"
import {
    useNavigate,
    Link
} from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msgError, setMsgError] = useState(null);
    const [alert, setAlert] = useState(null)
    const provider = new GoogleAuthProvider();
    
    const GoogleAuth = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                navigate('/admin')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const userAdd = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        //Email verification sent!
                        navigate('/admin')
                    }).catch((error) => {
                        console.log(error);
                    })
            }).catch((error) => {
                console.error(error.code)
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setMsgError("Email Already in Use");
                        setAlert("danger")
                        break;
                    case 'auth/weak-password':
                        setMsgError('Very Short Password')
                        setAlert("danger")
                        break;
                    case 'auth/invalid-email':
                        setMsgError("Weak Password");
                        setAlert("danger");
                        break;
                    case 'auth/admin-restricted-operation':
                        setMsgError('Admin Restricted Operation');
                        setAlert("danger");
                        break;
                    case 'auth/missing-email':
                        setMsgError('Missing Email');
                        setAlert('danger')

                }

            })
    }

    const userAuth = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate('/admin')
            }).catch((error) => {
                console.error(error.code)
                if (error.code === 'auth/wrong-password') {
                    setMsgError('Wrong Password');
                    setAlert("danger")
                }
                if (error.code === 'auth/internal-error') {
                    setMsgError('Internal Error');
                    setAlert("danger")
                }
                if (error.code === 'auth/user-not-found') {
                    setMsgError('User not Found')
                    setAlert("danger")
                }
            })

    }


    return (
        <form className="form-login" >
	<div className="form-group">
	    <input
		onChange = {(e)=>setEmail(e.target.value)}
		type="email" 
		placeholder="Email address" 
		className="form-control" 
		id="exampleInputEmail1" 
		aria-describedby="emailHelp" 
		placeholder="Enter email" />
	</div>
	<div className="form-group">
	    <input 
		onChange = {(e) =>setPass(e.target.value)}
		type="password" 
		autoComplete="on" 
		placeholder="Password" 
		className="form-control" 
		id="exampleInputPassword1" 
		placeholder="Password"/>
	    {
		msgError != null ? (
	     <div className={`alert alert-${alert}`} role="alert">
		{msgError}
		 </div>) :(
		    <span></span>
		 )	    
	    }
	</div>
	<div className="form-group">
	    <Link to="/forgot-your-password">Forgot your password ?</Link>
	</div>
	<button 
	    onClick={userAdd}
	    type="submit" 
	    className="btn 
	    btn-primary">
		Register
	</button>
	<button 
	    onClick={userAuth}
	    type="submit" 
	    className="btn 
	    btn-primary">
		log in
	</button>
	<div onClick={GoogleAuth} className="google-btn">
	    <div className="google-icon-wrapper">
		<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
	    </div>
	    <p className="btn-text"><b>Sign in with google</b></p>
	</div>
    </form>
    )
}

export default Login;
