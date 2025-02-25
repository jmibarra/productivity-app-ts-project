import { Navigate } from "react-router-dom";

interface Props {
	isLoggedIn: boolean;
	children: any;
}

function ProtectedRoute({ isLoggedIn, children }: Props) {
	console.log("isLoggedIn", isLoggedIn);
	return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
