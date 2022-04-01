import axios from "axios";
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
    
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359',
    
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280'
    }
  };
  
 
export const getPlacesData = async (type,sw, ne) => {
    try{
        //request
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
    
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280'
            }
          });

        return data;
    }catch(error){
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng)=>{
  try{
  const {data}= await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
    params: {      
      lat: lat,
      lon: lng
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': 'd43d17e85emshd3243c4bd5f510cp11733ejsn829485a00280'
    }
  });

  return data;
  }
  catch(error){
    console.log(error)
  }
}