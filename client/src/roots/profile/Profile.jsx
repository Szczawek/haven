import {Navigate} from "react-router";

export default function Profile({login}) {
    if(!login) return <Navigate to="/"/>
    
    return <div className="profile">
           <p>Profile</p> 
        </div>
}
