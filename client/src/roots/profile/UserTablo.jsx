import {Link} from "react-router"
import {useGetUserData} from "./useGetUserData.js";

export default function UserTablo({hash,loggedID}) {
    const {data, activity} = useGetUserData();

    if(data.id == "") return (
        <div className="warning">
            <p className="msg">Such an user doesn't exist</p>    
        </div>  
    )

    return <div className="tablo">
            <div className="baner">
                <img src="/images/baner.svg" alt="baner" />
            </div>
            <div className="box-one">
                <div className="avatar">
                    <img src="/images/user.svg" alt="avatar"/>
                </div>
                <header className="info">
                    <h2 className="nick">{data.name}</h2>
                    <p className="hash">{data.hash}</p>
                </header>
            </div>  
        {data.id == loggedID && <div className="box-two">
                <Link to="/profile/edit" className="edit-btn">
                    <h3>Edit Profile</h3>
                    <div className="icon">
                        <img src="/images/edit.svg" alt="icon"/>
                    </div>
                </Link>
            </div>}
        </div>
}
