import {useState, useEffect, useRef} from "react"

const statStd = {
    "loading":false,
    "error":false,
    "accepted": false,
}
function useGetUserPosts(hash) {
    const [list, setList] = useState([]);
    const [stat, setStat] = useState(statStd);
    const once = useRef(false);

    function refresh(name, value) {
        setStat(prev =>({...prev,[name]:value }))
    }

    useEffect(()=>{
        if(once.current) return;
        async function getPosts() {
            try {
                refresh("loading", true);
                const options = {
                    method:"GET",
                    credentials:"include"
                }
                const res = await fetch(`${__SERVER_URL__}/get-user-posts?hash=${hash}`,options);
                if(!res.ok) throw new Error(res.status);
                const obj = await res.json();
                refresh("accepted",true);
                if(obj == null) return;
                setList(obj);
            } catch(err) {
                refresh("error",true);
            } finally {
                refresh("loading", false);
            }
        }
        getPosts();
        once.current = true;
    },[])

    return {list:list,stat:stat}
}

export {useGetUserPosts}
