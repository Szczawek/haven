import "./forms.css";
import {Outlet, Navigate} from "react-router"

export default function AccountFormContainer({logged}) {
   if(logged) {
        return <Navigate to="/"/>
   }

    return <div className="account-action">
            <Outlet/>
        </div>
}
