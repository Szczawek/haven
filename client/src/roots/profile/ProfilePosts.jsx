import {useGetUserPosts} from "./useGetUserPosts.js";

export default function ProfilePosts({hash}) {
    const {list,stat} = useGetUserPosts(hash); 
    
    if(list.length == 0) return <div className="empty-container"><p className="msg">Empy comments!</p></div>
    return <div className="table-list">
            {list.map((e,index)=>{
                return <div className="u-post">
                        <header className="top-info">
                            Name
                        </header>
                    </div>
            })}
        </div>
}
