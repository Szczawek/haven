import "./forms.css";
import {Outlet} from "react-router"

export default function AccountFormContainer() {
    return <div className="acc-form-box">
            <p>Test</p>
            <Outlet/>
        </div>
}
