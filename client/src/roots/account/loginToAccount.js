export async function loginToAccount(data) {
    const options = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(data)
    }
    const res = await fetch("https://127.0.0.1:3000/api/login-to-account",options);
    if(!res.ok) throw new Error(res.status);
}
