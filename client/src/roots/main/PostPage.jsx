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
    return <div className="post">
                <header className="user-info">
                    <h2 className="user-name">{data.name}</h2>
                    <div className="options">
                        <button onClick={()=>setMenu(prev => !prev)} className="show-list">Icon</button>
                        <ul className={`list ${menu}`}>
                            <li className="option">
                                <button>SDS</button>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="content">{data.content}</div>
            </div>
}
