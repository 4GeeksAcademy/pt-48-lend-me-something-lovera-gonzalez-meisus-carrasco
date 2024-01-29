
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
export const editUser = async (userData) => {
    const data = await fetch(`${FF_API}/user/`, {
        method: "PUT",
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
export const deleteUser = () => { };


export const updateSubscription = async (userData) => {
    const data = await fetch(`${FF_API}/subscription/`, {
        method: "PUT",
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
export const cancelSubscription = async (subscription_stripe) => {
    const data = await fetch(`${FF_API}/subscription`, {
        method: "DELETE",
        body: JSON.stringify(subscription_stripe),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => data)
        return await data
    // console.log(await data)
 };


export const getPortfolio = async (portfolio_id) => {
    const data = await fetch(`${FF_API}/portfolio_list/${portfolio_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => data)
    // console.log(await data)
    return await data
 };
export const addToPortfolio = async (itemData) => {
    console.log(itemData)
    const data = await fetch(`${FF_API}/portfolio_list/`, {
        method: "POST",
        body: JSON.stringify(itemData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => data)
    // console.log(await data)
    return await data
 };
export const deleteFromPortfolio = async () => {
    const data = await fetch(`${FF_API}/potfolio/`, {
        method: "DELETE",
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



