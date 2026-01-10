import {lazy,Suspense, useEffect, useState, useRef} from "react";
import {BrowserRouter, Route, Routes}  from "react-router";
import {getLoginData} from "./global/getLoginData.js";
import "./styles.css";
const CreateAccount = lazy(()=>import("./roots/account/CreateAccount.jsx"));
const LoginToAccount = lazy(()=>import("./roots/account/LoginToAccount.jsx"));
const AccountFormContainer = lazy(()=>import("./roots/account/AccountFormContainer.jsx"));
const Navigator = lazy(()=>import("./roots/navigation/Navigator.jsx"));
const Home = lazy(()=>import("./roots/main/Home.jsx"));
const NotFound = lazy(()=>import("./roots/not-found/NotFound.jsx"));
const Profile = lazy(()=>import("./roots/profile/Profile.jsx"));
const Shop = lazy(()=>import("./roots/shop/Shop.jsx"));
const AddItemToShop = lazy(()=>import("./roots/shop/AddItemForm.jsx"));
import Loading from "./roots/not-found/Loading.jsx";
 
const stdStates = {
    loadding:false,
    error:false,
    logged:false,
}

const stdData = {
    name:"",
    login:"",
}
export default function App() {
    const [states,setStates] = useState(stdStates);
    const [data,setData] = useState(stdData);
    const connection = useRef(false);
    function refresh(name, bool) {
        setStates(prev => ({...prev, [name]:bool}));
    }

    async function autoLogin() {
        try {
            refresh("loading", true);
            const res = await getLoginData();
            setData(res);
            refresh("logged", true);
        } catch(err) {
            refresh("error", true);
        } finally {
            refresh("loading", true);
        }
    }
    
    useEffect(() => {
        if(connection.current) return;
        connection.current = true;
        autoLogin();
    },[])
    
    return ( 
        <div className="app">
            <Suspense fallback={<Loading/>}>
                <BrowserRouter>
                    <Navigator />
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="account" element={<AccountFormContainer/>}>
                            <Route index element={<LoginToAccount/>} />
                            <Route path="create" element={<CreateAccount/>}/>
                        </Route>
                        <Route path="profile" element={<Profile log={states.logged}/>}/>
                        <Route path="shop" element={<Shop/>} />
                        <Route path="shop/add-item" element={<AddItemToShop/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    )
}
