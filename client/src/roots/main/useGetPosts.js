import {useState, useEffect, useRef} from "react";
function useGetPosts() {
    const [list, setList] = useState([]);
    const once = useRef(false);
    
    useEffect(() => {
        if(once.current) return;
        once.current = true;
        async function loadList() {
            try {
                //add limit etc
                const options =  {
                    method:"GET",
                    credentials:"include",
                }
                const res = await fetch("https://127.0.0.1:3000/api/get-posts", options);
                if(!res.ok) throw new Error(res.status);
                const obj = await res.json();
                if(obj == null) return;
                setList(prev => ([...prev, ...obj]));
            } catch(err) {
                console.error(err)
            } finally {
                console.log("finally");
            }
        }
        loadList();
    },[])
    return list
}

export {useGetPosts}
