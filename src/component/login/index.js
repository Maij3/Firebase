import React, {
    useState
} from "react";
import "./login.css";
import {
    auth
} from "../../firebase/firebaseConfig"
import {
    createUserWithEmailAndPassword , 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
const Login = () => {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msgError, setMsgError] = useState(null);
    const [alert , setAlert] = useState(null)
    

    const userAdd = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
		navigate('/')
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
		    case 'auth/missing-email' :
			setMsgError('Missing Email');
			setAlert('danger')
	
                }

            })
    }

    const userAuth = (e) => {
	e.preventDefault();
	signInWithEmailAndPassword(auth , email , pass)
	    .then((userCredential) =>{
		const user = userCredential.user;
		console.log(user)
		navigate('/admin')
	    }).catch((error) =>{
		console.error(error.code)
		if(error.code === 'auth/wrong-password'){
		    setMsgError('Wrong Password');
		    setAlert("danger")
		}if(error.code === 'auth/internal-error'){
		    setMsgError('Internal Error');
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

    </form>
    )
}

export default Login;
