export async function createAccount(data) {
    const options = {
        method:"POST",
        header:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(data)
    }
    const res = await fetch(`${__SERVER_URL__}/create-account`,options)
    return res;
}
