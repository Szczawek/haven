import {useState} from "react";
import {createAccount} from "./createAccount.js";
import {Link} from "react-router";
const stdData = {
    name:"",
    login:"",
    password:"",
    copassword:"",
    hash:"",
}

const statusDef = {
    loading:false,
    error: false,
    passErr:false,
}
export default function CreateAccount({reLoading}) {
    const [data,setData] = useState(stdData);
    const [status,setStatus] = useState(statusDef);
    const [isPassHidden, setIsPassHidden] = useState(true);

    function refreshStatus(name, bool) {
        setStatus(prev =>({...prev, [name]:bool}))
    }

    function setValue(e) {
        const {value,name} = e.target
        setData(prev => ({...prev,[name]:value}));
    }

    async function submit(e) {
        try {
            e.preventDefault();
            if(data.password != data.copassword) return refreshStatus("passErr", true);
            refreshStatus("loading",true);
            const relData = {...data};
            delete relData.copassword; 
            const res = await createAccount(relData);
            if(!res.ok) {
                if(res.status == 406) {
                    const obj = await res.json();
                    obj.status = 406;
                    throw new Error(obj);
                }  else {
                    const obj = {status:res.status}
                    throw new Error(obj);
                }
            }
            reLoading();
        } catch(err) {
            if(err.status == 406) {
                console.log(err);
            }
            console.log(err)
    
            refreshStatus("error",true);
        } finally {
            refreshStatus("loading",false);
        }
    }

    return <div className="create-box">
            <form onFocus={()=>setStatus(statusDef) } onSubmit={submit} className="create-form">
                <h2 className="title">Create</h2>
                <label htmlFor="inp-name" className="inp-box">
                    Name
                    <input className="data-inp" id="inp-name" value={data.name} onChange={setValue} required maxLength="30" minLength="3" name="name" placeholder="Put your name..." />
                </label>
                <label className="inp-box" htmlFor="inp-unque">
                    Unique Name
                    <input value={data.hash} onChange={setValue} name="hash" maxLength="30" minLength="3"  id="inp-unique" className="data-inp" required placeholder="Put your unique name..."/>
                </label>
                <label htmlFor="inp-login" className="inp-box">
                    Email
                    <input className="data-inp" id="inp-login" value={data.login} onChange={setValue} type="email" required maxLength="30" name="login" minLength="3" placeholder="Put your login..." />
                </label>
                <label htmlFor="inp-password" className="inp-box">
                    <p>Password</p>{status.passErr && <small>Must be equal</small>}
                    <button tabIndex="-1" className="show-pass" onClick={()=>setIsPassHidden(prev=>!prev)} type="button">{isPassHidden? <img src="/images/eye-close.svg" alt="icon"/> : <img src="/images/eye-open.svg" alt="icon"/>}</button>
                    <input className="data-inp" id="inp-password" value={data.password} onChange={setValue} type={isPassHidden? "password": "text"} required maxLength="30" name="password" minLength="8" placeholder="Put your password..." />
                </label>
                <label htmlFor="inp-c-password" className="inp-box">
                    Confirm Password
                    <input className="data-inp" id="inp-c-password" value={data.copassword} onChange={setValue} type={isPassHidden? "password": "text"} required maxLength="30" name="copassword" minLength="8" placeholder="Put your password..." />
                </label>
                <button className="sb" type="submit">Submit</button>
            </form>
            <div className="panel">
                <p>Go to:</p>
                <Link to="..">Login in</Link>
            </div>
        </div>
}
