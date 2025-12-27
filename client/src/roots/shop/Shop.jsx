import {Link} from "react-router";
export default function Shop() {
    return <div className="Shop">
            <header>
                <h2 className="title">Shop</h2>
                <label htmlFor="inp-se-shop"><input required type="search" placholder="Anything that you want..." id="inp-se-shop"/></label>
                <Link to="add-item">Add item to shop</Link>
            </header>
            <div className="page">
            </div>
        </div>
}
