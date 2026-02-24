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
    return <div className="post">
                <header className="user-info"></header>
                <div className="content"></div>
            </div>
}
