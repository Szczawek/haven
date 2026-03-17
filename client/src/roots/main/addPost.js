async function addPost(data) {
    const options = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        credentials:"include",
        body: JSON.stringify(data),
    }
    const res = await fetch(`${__SERVER_URL__}/v2/add-post`,options);
    if(!res.ok) throw new Error(res.status);
}

export {addPost};
