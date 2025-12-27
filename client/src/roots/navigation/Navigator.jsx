import {NavLink} from "react-router";

export default function Navigator() {
    return <header className="navigator-box">
            <nav className="navigator">
                <ul className="list">
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": ""} to="">Home</NavLink>
                    </li>
                      <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": ""} to="account">Login</NavLink>
                    </li>
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": ""} to="video">Video</NavLink>
                    </li>
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": ""} to="shop">Shop</NavLink>
                    </li>
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": ""} to="profile">Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
}
