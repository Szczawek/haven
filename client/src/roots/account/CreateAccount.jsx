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
export default function CreateAccount() {
    const [data,setData] = useState(stdData);
    const [loading,setLoading] = useState(stdLoading);

    function refresh(name, bool) {
        setLoading(prev =>({...prev, [name]:bool}))
    }

    function setValue(e) {
        const {value,name} = e.target
        setData(prev => ({...prev,[name]:value}));
    }
    async function submit(e) {
        try {
            e.preventDefault();
            refresh("loading",true);
            const relData = {...data};
            delete relData.copassword; 
            const res = await createAccount(relData);
            alert("logged!");
        } catch(err) {
            refresh("error",true);
        } finally {
            refresh("loading",false);
        }
    }
    return <div className="create-box">
            <form onSubmit={submit} className="create-form">
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
                    <input id="inp-password" value={data.password} onChange={setValue} type="password" required maxLength="30" name="password" minLength="3" placeholder="Put your password..." />
                </label>
                <label htmlFor="inp-c-password" className="lb-acc">
                    Confirm Password
                    <input id="inp-c-password" value={data.copassword} onChange={setValue} type="password" required maxLength="30" name="copassword" minLength="3" placeholder="Put your password..." />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div className="panel">
                <Link to="..">Login in</Link>
            </div>
        </div>
}
