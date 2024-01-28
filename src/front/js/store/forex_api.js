const FF_API = process.env.BACKEND_URL

export const get_all_data_forex = async () => {

    const request = await fetch(`${FF_API}/forex`, { method: 'GET' })
    const data = await request.json()
    return await data

}