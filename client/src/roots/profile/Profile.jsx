import {useParams} from "react-router";
import UserTablo from "./UserTablo.jsx"
import ProfilePosts from "./ProfilePosts.jsx";
import "./profile.css";

export default function Profile({loggedID}) {
    const params = useParams()
    return <div className="profile">
        <UserTablo hash={params["*"]} loggedID={loggedID}/>
        <ProfilePosts hash={params["*"]}/>
        </div>
}
