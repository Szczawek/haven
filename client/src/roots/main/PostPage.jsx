import {useState} from "react"
import {useGetPosts} from "./useGetPosts.js";
export default function PostPage() {
    const list = useGetPosts();

    return <div className="post-page">
        {list.length == 0?<p>Empty page</p> :
        list.map((e,id) => {
            return <Post data={e} key={id} />
        })}
        </div>
}

function Post({data}) {
    const [menu, setMenu] = useState(false);
    
    function closeMenu(e) {
        if(!e.relatedTarget) setMenu(false);
    }
    return <div className="post">
                <header className="user-info">
                    <div className="avatar"><img src="/images/user.svg" alt="profile"/></div>
                    <h2 className="user-name">{data.name}</h2>
                    <div onBlur={closeMenu} className="options">
                        <button onClick={()=>setMenu(prev => !prev)} className="show-list"><img src="/images/menu.svg" alt="icon"/></button>
                        <ul className={`list ${menu? "" : "hidden"}`}>
                            <li className="option">
                                <button>hide</button>
                            </li>
                            <li className="option">
                                <button>report</button>
                            </li>
                            <li className="option">
                                <button>stat</button>
                            </li>
                            <li className="option">
                                <button>info</button>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="content">{data.content}</div>
                <div className="stat">
                    <ul className="interaction">
                        <li><button className="st-btn"> <img src="/images/com.svg" alt="icon"/></button></li>
                        <li><button className="st-btn"><img src="/images/like.svg" alt="icon"/></button></li>
                        <li><button className="st-btn"><img src="/images/share.svg" alt="icon"/></button></li>
                    </ul>
                </div>
            </div>
}
