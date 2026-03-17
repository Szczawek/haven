import {addPost} from "./addPost.js";
import {useState} from "react";
import {Link} from "react-router";

const stdPostStatus = {
    warning:false,
    error:false,
    loading:false,
    accepted:false, 
}
export default function WritePost({data, logged}) {
    const [content, setContent] = useState("");
    const [postStat, setPostStat] = useState(stdPostStatus);
   
    
    async function submit(e) {
        try {
            e.preventDefault();
            if(!logged) return;
            setStatus("loading",true);
            if(content.length < 1) return setStatus("warning",true);
            const dataTemp = {content,userID:data.id};
            const res = await addPost(dataTemp); 
            //add timer 1s : button disabled, reset
            setPostStat(stdPostStatus);
            setContent("");
        } catch(err) {
            console.error(err);
            setStatus("error", true);
        } finally {
            setStatus("loading", false);
        }
    } 

    function setStatus(name,val) {
        setPostStat(prev=>({...prev, [name]:val}));
    }

    if(!logged) {
        return <div className="link-box"><Link to="/account">Log in</Link></div>
    }

    return <form onSubmit={submit} className="write-post">
            <header className="user-info">
                <div className="avatar">
                    <img src="/images/user.svg" alt="profile picture"/>
                </div>
                <div className="info">
                    <h2 className="nick">{data.name}</h2>
                    <p className="hash">{data.hash}</p>
                </div>
            </header>
            <label className="text-lb" htmlFor="msg-inp" >
                <textarea onFocus={()=>postStat.warning? setStatus("warning", false) : null} maxLength="500" value={content} onChange={e=>setContent(e.target.value)} className="text-box" id="msg-inp"  placeholder="Easy come, easy go . . ."></textarea>
            {postStat.warning && <small className="warning">Can't be empty</small>}
            </label>
            <div className="controlls">
                <button disabled={postStat.loading} className="sb-btn" type="submit">Post</button>
            </div>
        </form>
}
