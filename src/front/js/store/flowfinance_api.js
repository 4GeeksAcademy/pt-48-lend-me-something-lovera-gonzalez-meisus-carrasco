
const FF_API = process.env.BACKEND_URL

export const getUser = async (email) => {
    const data = await fetch(`${FF_API}/user/${email}`)
        .then(res => res.json())
        .then(data => data)
    // console.log(await data)
    return await data
}



export const addUser = async (userData) => {
    const data = await fetch(`${FF_API}/user/`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => data)
    // console.log(await data)
    return await data
};
export const edditUser = () => { };
export const deleteUser = () => { };


export const getSubscription = () => { };
export const updateSubscription = () => { };


export const getPortfolio = () => { };
export const addToPortfolio = () => { };
export const deleteFromPortfolio = () => { };



