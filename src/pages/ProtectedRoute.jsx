import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const userDetails = JSON.parse(localStorage.getItem('loggedIn')); 
    debugger
	return !userDetails.loggedIn
		? <Navigate to ="/signin" />
		: children
  };
 
export default ProtectedRoute;