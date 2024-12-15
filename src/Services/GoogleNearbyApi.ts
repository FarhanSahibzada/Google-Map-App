
import axios from "axios";

// for nearby places 
const BASE_URL = "https://overpass-api.de/api/interpreter";

const nearByPlace = async (lat: number, lng: number, type: string) => {
  type = type.trim().toLocaleLowerCase()
  const query = `
    [out:json];
    (
      node["amenity"="${type}"](around:3000, ${lat}, ${lng});
      way["amenity"="${type}"](around:3000, ${lat}, ${lng});
      relation["amenity"="${type}"](around:3000, ${lat}, ${lng});
    );
    out body;
  `;

  try {
    const response = await axios.get(BASE_URL, {
      params: { data: query }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby places from OSM:", error);
    throw error;
  }
};

// for searchtext 
const BASE_URLL = 'https://nominatim.openstreetmap.org';


const SearchText = async (value: string) => {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.363',
      'Referer': 'strict-origin-when-cross-origin',
       'Accept-Language': 'en-US,en;q=0.5'
    };

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=1`, {headers})
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    const data = response.json()
    return data ;

  } catch (error) {
    console.log('API Error:', error)
    throw error
  }
}


export default {
  nearByPlace,
  SearchText
};

