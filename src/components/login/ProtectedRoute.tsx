import { Navigate } from "react-router-dom";

interface Props {
	isLoggedIn: boolean;
	children: any;
}

function ProtectedRoute({ isLoggedIn, children }: Props) {
	return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
