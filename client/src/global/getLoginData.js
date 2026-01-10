export async function getLoginData() {
    const options = {
        method:"GET",
        credentials:"include",
    }

    const res = await fetch("https://127.0.0.1:4000/api/auto-login", options);
    if(!res.ok) throw new Error(res.status);
    const obj = await res.json();
    return obj;
}
