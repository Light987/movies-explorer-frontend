import {Navigate} from "react-router-dom";

const ProtectedRoute = ({element: Component, ...props}) => {

    return props.isAppLoad ?
        (props.loggedIn ?
            <Component {...props} /> :
            <Navigate to="/" replace/>) :
        <></>

};

export default ProtectedRoute;