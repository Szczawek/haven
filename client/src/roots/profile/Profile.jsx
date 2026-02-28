import {Navigate} from "react-router";
import UserTablo from "./UserTablo.jsx"
import "./profile.css";

export default function Profile({data, logged}) {
    if(!logged) return <Navigate to="/account"/>
    
    return <div className="profile">
           <UserTablo data={data}/>
        </div>
}
