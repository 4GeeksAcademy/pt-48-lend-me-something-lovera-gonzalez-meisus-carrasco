const API_Token =  'f4e6639926cc3b8d48d2457dc5713850'
const base_weather_api_url = 'https://api.openweathermap.org/data/2.5/weather?'

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export const get_weather_by_coords = async (lat, lon) => {
    const request = await fetch(`${base_weather_api_url}lat=${lat}&lon=${lon}&appid=${API_Token}`);
    const data = await request.json();
    return await data 
}
export const get_weather_by_city = async (city) => {
    const request = await fetch(`${base_weather_api_url}q=${city}&appid=${API_Token}`);
    const data = await request.json();
    return await data 
}