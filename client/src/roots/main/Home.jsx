import WritePost from "./WritePost.jsx"
import PostPage from "./PostPage.jsx";
import "./home.css"
export default function Home({id}) {
    return <div className="home">
            <WritePost id={id}/>
            <PostPage/>
        </div>
}
