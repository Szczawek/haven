import {Navigate} from "react-router";
import UserTablo from "./UserTablo.jsx"
import "./profile.css";

export default function Profile({data}) {
    //if(!login) return <Navigate to="/"/>
    
    return <div className="profile">
           <UserTablo data={data}/>
        </div>
}
