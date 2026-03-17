import {useState, useEffect, useRef} from "react";

const dataDef = {
    nick:"",
    hash:"",
    id:"",
}

const activityDef = {
    error:false,
    loading:false,
}

function useGetUserData() {
    const [data,setData] = useState(dataDef);
    const [activity,setActivity] = useState(activityDef);
    const once = useRef(false);

    useEffect(()=>{
        if(once.current) return;
        async function loadData() {
            try {
                const res = await fetch(`${__SERVER_URL__}/get-user-data`);
                if(!res.ok) throw new Error(res.status);
                const obj = await res.json();
                setData(obj);
            } catch(err) {
                console.error(err);
            } finally {
                console.log("done");
            }
        }
        once.current = true;
    },[])
    
    return {data,activity};
}

export {useGetUserData}
