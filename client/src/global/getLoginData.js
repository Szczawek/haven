export async function getLoginData() {
    const options = {
        method:"GET",
        credentials:"include",
    }

    const res = await fetch(`${__SERVER_URL__}/auto-login`, options);
    if(!res.ok) throw new Error(res.status);
    const obj = await res.json();
    return obj;
}
