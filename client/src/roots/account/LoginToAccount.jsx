import {useState, useRef} from "react";
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

export default function LoginToAccount({reLoading}) {
    const [data, setData] = useState(stdData);
    const [loading,setLoading] = useState(stdLoading);
    const passInp = useRef(null);

    function refresh(name,bool) {
        setLoading(prev => ({...prev,[name]:bool}))
    }

    function setValue(e) {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]:value}));
    }

    function setPassVis() {
        const type = passInp.current.type;
        if(type == "password") {
            passInp.current.type = "text";
            return;
        }
        passInp.current.type = "password";
    }

    async function submit(e) {
        try {
            e.preventDefault();
            const res = await loginToAccount(data); 
            refresh("loading", true);
            console.log("logged")
            reLoading()
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
                <h2 className="title">Login</h2>
                <label className="lb-acc" htmlFor="inp-l-login">
                 Login
                    <input  type="email" id="inp-l-login" required name="login" value={data.login} onChange={setValue} maxLength="30" minLength="3" placeholder="place your login..."/>
                </label>   
                <label className="lb-acc" htmlFor="inp-l-pass">
                    Password
                    <input ref={passInp} type="password" id="inp-l-pass" required name="password" value={data.password} onChange={setValue} maxLength="30" minLength="3" placeholder="place your password..."/>
                    <button type="button" onClick={setPassVis} className="show-pass">X</button>
                </label> 
                <button className="sb" type="submit">Submit</button>
            </form>
            <div className="panel">
                <Link to="create">Create Account</Link>
            </div>
        </div>
}
