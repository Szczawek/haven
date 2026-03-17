export default function AddVideo() {
    return <form className="add-vid-box">
            <header className="info">
                <h2 className="title">Add video</h2>
            </header>
            <label htmlFor="vid-inp" className="vid-label">
                <p className="sub-title">Put your video</p>
                <input id="vid-inp" required type="file" accepty="video/.mp4"/>
            </label>
        </form>
}
