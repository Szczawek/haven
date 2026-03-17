import {NavLink} from "react-router";
import "./nav.css";
export default function Navigator({userHash}) {
    return <header className="navigator-box">
            <nav className="navigator">
                <ul className="list">
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": undefined} to="">Home</NavLink>
                    </li>
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": undefined} to="video">Video</NavLink>
                    </li>
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": undefined} to="shop">Shop</NavLink>
                    </li>
                    <li className="link">
                        <NavLink className={({isActive}) => isActive? "active": undefined} to={`profile/${userHash}`} >Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
}
