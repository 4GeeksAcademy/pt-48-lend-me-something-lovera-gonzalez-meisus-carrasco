const FF_API = process.env.BACKEND_URL

export const get_all_data_crypto = async () => {

    const request = await fetch(`${FF_API}/crypto`, { method: 'GET' })
    const data = await request.json()
    return await data

}