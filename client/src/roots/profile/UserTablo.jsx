import {Link} from "react-router"

export default function UserTablo({data}) {
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
                    <p className="hash">{data.id}</p>
                </header>
            </div>
            <div className="box-two">
                <Link to="/edit-profile" className="edit-btn">
                    <h3>Edit Profile</h3>
                    <div className="icon">
                        <img src="/images/edit.svg" alt="icon"/>
                    </div>
                </Link>
            </div>
        </div>
}
