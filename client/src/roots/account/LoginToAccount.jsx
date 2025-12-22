import {useState} from "react";
import {loginToAccount} from "./loginToAccount.js";
import {Link} from "react-router";
const stdData = {
    login:"",
    password:""
}

const stdLoading = {
    loading:false,
    error:false
}

export default function LoginToAccount() {
    const [data, setData] = useState(stdData);
    const [loading,setLoading] = useState(stdLoading);

    function refresh(name,bool) {
        setLoading(prev => ({...prev,[name]:bool}))
    }

    function setValue(e) {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]:value}));
    }

    async function submit(e) {
        try {
            e.preventDefault();
            const res = await loginToAccount(data); 
            refresh("loading", true);
            alert("logged")
        } catch(err) {
            console.error("erer")
            refresh("error",true);
        } finally 
        {
            refresh("loading",false); 
        }
    }

    return <div className="login-ac">
            <form className="login-form" onSubmit={submit}>
                <label className="lb-acc" htmlFor="inp-l-login">
                 Login
                    <input id="inp-l-login" required name="login" value={data.login} onChange={setValue} maxLength="30" minLength="3" placeholder="place your login..."/>
                </label>   
                <label className="lb-acc" htmlFor="inp-l-pass">
                    Password
                    <input id="inp-l-pass" required name="password" value={data.password} onChange={setValue} maxLength="30" minLength="3" placeholder="place your password..."/>
                </label> 
                <button type="submit">Submit</button>
            </form>
            <div className="panel">
                <Link to="create">Create Account</Link>
            </div>
        </div>
}
