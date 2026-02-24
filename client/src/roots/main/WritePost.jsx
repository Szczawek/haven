import {addPost} from "./addPost.js";
import {useState} from "react";

const stdPostStatus = {
    warning:false,
    error:false,
    loading:false,
    accepted:false, 
}
export default function WritePost({id}) {
    const [content, setContent] = useState("");
    const [postStat, setPostStat] = useState(stdPostStatus);
    async function submit(e) {
        try {
            e.preventDefault();
            setStatus("loading",true);
            if(content.length < 1) return;
            const data = {content,userID:id};
            console.log(data);
            const res = await addPost(data);
            //add timer 1s : button disabled, reset
            setPostStat(stdPostStatus);
            setContent("");
        } catch(err) {
            setStatus("error", true);
        } finally {
            setStatus("loading", false);
        }
    } 

    function setStatus(name,val) {
        setPostStat(prev=>({...prev, [name]:val}));
    }

    return <form onSubmit={submit} className="write-post">
            <header className="user-info">
                <div className="avatar">
                    <img  alt="profile picture"/>
                </div>
                <div className="info">
                    <h2 className="nick">Name</h2>
                </div>
            </header>
            <label className="text-lb" htmlFor="msg-inp" >
                <textarea maxLength="500" value={content} onChange={e=>setContent(e.target.value)} className="text-box" id="msg-inp"  placeholder="Easy come, easy go . . ."></textarea>
            </label>
            <div className="controlls">
                <button className="sb-btn" type="submit">Post</button>
            </div>
        </form>
}
