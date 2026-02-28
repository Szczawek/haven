import {useParams} from "react-router"
export default function SinglePost() {
    const url = useParams()

    //Each post needs to have unque hash( hash(id))
    //it doesn't need to be complitated 
    console.log(url["*"])
    return <div className="singlePost">
            <div className="main-post">
            </div>
            //list of posts
        </div>
}
