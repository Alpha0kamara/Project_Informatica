
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({
    user,
    redirectPath = "/auth",
    children,
}) => {
    if (!user) {
        console.log("user in private route: ", user)
        return <Navigate to={redirectPath} />;
    }
        return children;
    
};

export default ProtectedRoute