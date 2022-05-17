import React , { useEffect , useState } from "react";
import './App.css';
import Navbar from "./component/nav";
import Login from "./component/login";
import ForgotyourPassword from "./component/forgot-you-password";
import {
    Routes,
    Route
} from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth"; 


function App() {

    const [ user , setUser ]  = useState(null); 
    

    useEffect(() => {
	    onAuthStateChanged(auth, (usuario) => {	    
	if(usuario){
            if (usuario.emailVerified) {
		setUser(usuario.email);
	    }else{
		setUser(null)
	    }
	}	
        })
    }, [])

  return (
    <div className="container">	
	<Navbar />
	<Routes>
	    <Route path="/" element = { <h1>Home</h1> } />
	    <Route path="/login" element = { <Login /> } />
	    {
		user ? (
		    <Route path="/admin" element ={ <h1>Usuario</h1> }/>
		):(
		    <Route path="no-access" element = { <h1>No Access</h1> } />
		)
	    }
		    <Route path="/forgot-your-password" element = { <ForgotyourPassword /> } />    
	    <Route path="*" element = { <h1>Not Found</h1> } />
	</Routes>
    </div>
  );
}

export default App;
