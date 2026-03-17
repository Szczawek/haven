export default function WatchPage() {
    const list = [];

    if(list.length == 0) return (
        <div className="empty-vid">
            <p className="msg">You can be the first one, who was added video . . .</p>
        </div>
    )

    return <div className="video-page">
            {list.map((e,index) => {
                return (
                    <div className="video-box">
                        <div className="preview">
                        </div>
                        <footer>
                            <div className="canal-link">
                            
                            </div>
                            <h2 className="title"></h2>
                        </footer>
                    </div>
                )
            })}
        </div>
}
