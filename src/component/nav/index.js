import React, {
    useEffect,
    useState
} from "react";
import {
    Link
} from "react-router-dom";
import "./nav.css";
import "../../assets/js/menu";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth"
import {
    auth
} from "../../firebase/firebaseConfig";

import { useNavigate } from 'react-router-dom';

const Nav = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setUser(usuario.email);
	    }else{
		setUser(null)
	    }
        })
    }, [])

    const [user, setUser] = useState(null);


    const signOff = () => {
        signOut(auth);
	setUser(null);
	navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Home </Link>
  <button 
	className="navbar-toggler" 
	id="btn-nav"   
	type="button" 
	data-toggle="collapse" 
	data-target="#navbarNav" 
	aria-controls="navbarNav" 
	aria-expanded="false" 
	aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
	  {
	      user ? (
		    <span></span>
	      ):(
		<Link  className="nav-link" to="/login">Login</Link>  
	      )
	  }
      </li>
       <li className="nav-item">
	{
	    user ? (
		<Link className="nav-link" to="/admin">Administrator</Link>
	    ):(
		<span></span>
	    )
	}
	</li>
	<li className="nav-item">
     {
	  user ?(
	      <button 
	        onClick={signOff}
		className="btn btn-danger"
		>
		Sign off
	      </button>
	  ):(
	    <span></span>
	  )
      }

	</li>

    </ul> 
    
   </div> 
</nav>
)}

export default Nav;
