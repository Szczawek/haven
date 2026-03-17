export async function loginToAccount(data) {
    const options = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(data)
    }
    const res = await fetch(`${__SERVER__URL__}/login-to-account`,options);
    if(!res.ok) throw new Error(res.status);
}
