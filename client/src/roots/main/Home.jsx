import WritePost from "./WritePost.jsx"
import PostPage from "./PostPage.jsx";
import "./home.css"
export default function Home({data,logged}) {
    return <div className="home">
            <WritePost data={data} logged={logged}/>
            <PostPage/>
        </div>
}
