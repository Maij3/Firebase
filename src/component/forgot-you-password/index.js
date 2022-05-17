import React, {
    useState
} from "react";
import {
    auth
} from "../../firebase/firebaseConfig";
import {
    sendPasswordResetEmail
} from "firebase/auth";

const ForgotyourPassword = () => {

    const [email, setEmail] = useState("");

    const passRecovery = (e) => {
	e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
		// ..
		console.log("Correo de Recuperacion de Contrasena")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <form className="form-login">
	    <p>
Enter the email where the link for the password change will be sent</p>
	    <input
		onChange = {(e)=>setEmail(e.target.value)}
		type="email" 
		placeholder="Confirm Email" 
		className="form-control" 
		aria-describedby="emailHelp" 
		 />
	    <button 
		type="submit" 
		onClick={passRecovery} 
		className="btn btn-primary">
		Send
	    </button>
    
	</form>
    )
}

export default ForgotyourPassword;
