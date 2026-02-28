import {useState} from "react";
import {createAccount} from "./createAccount.js";
import {Link} from "react-router";
const stdData = {
    name:"",
    login:"",
    password:"",
    copassword:""
}

const stdLoading = {
    loading:false,
    error: false,
}
export default function CreateAccount({reLoading}) {
    const [data,setData] = useState(stdData);
    const [loading,setLoading] = useState(stdLoading);
    const [isPassHidden, setIsPassHidden] = useState(true);
 
    function refresh(name, bool) {
        setLoading(prev =>({...prev, [name]:bool}))
    }

    function setValue(e) {
        const {value,name} = e.target
        setData(prev => ({...prev,[name]:value}));
    }

    async function submit(e) {
        try {
            e.preventDefault()
            //if(data.password != data.copassword) throw new Error("Not the same password");
            refresh("loading",true);
            const relData = {...data};
            delete relData.copassword; 
            const res = await createAccount(relData);
            console.log("logged!")
            reLoading();
        } catch(err) {
            refresh("error",true);
        } finally {
            refresh("loading",false);
        }
    }
    return <div className="create-box">
            <form onSubmit={submit} className="create-form">
                <h2 className="title">Create</h2>
                <label htmlFor="inp-name" className="lb-acc">
                    Name
                    <input id="inp-name" value={data.name} onChange={setValue} required maxLength="30" minLength="3" name="name" placeholder="Put your name..." />
                </label>
                <label htmlFor="inp-login" className="lb-acc">
                    Email
                    <input id="inp-login" value={data.login} onChange={setValue} type="email" required maxLength="30" name="login" minLength="3" placeholder="Put your login..." />
                </label>
                <label htmlFor="inp-password" className="lb-acc">
                    Password
                    <button tabIndex="-1" className="show-pass" onClick={()=>setIsPassHidden(prev=>!prev)} type="button">{isPassHidden? <img src="/images/eye-close.svg" alt="icon"/> : <img src="/images/eye-open.svg" alt="icon"/>}</button>
                    <input id="inp-password" value={data.password} onChange={setValue} type={isPassHidden? "password": "text"} required maxLength="30" name="password" minLength="3" placeholder="Put your password..." />
                </label>
                <label htmlFor="inp-c-password" className="lb-acc">
                    Confirm Password
                    <input id="inp-c-password" value={data.copassword} onChange={setValue} type={isPassHidden? "password": "text"} required maxLength="30" name="copassword" minLength="3" placeholder="Put your password..." />
                </label>
                <button className="sb" type="submit">Submit</button>
            </form>
            <div className="panel">
                <p>Go to:</p>
                <Link to="..">Login in</Link>
            </div>
        </div>
}
