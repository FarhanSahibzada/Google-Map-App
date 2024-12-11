
import axios from "axios";


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

export default {
  nearByPlace,
};


// import axios from "axios";

// const OSM_BASE_URL = "https://overpass-api.de/api/interpreter";
// const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

// /**
//  * Fetch nearby places from OSM.
//  */
// const nearByPlace = async (lat: number, lng: number, type: string) => {
//   const query = `
//     [out:json];
//     (
//       node["amenity"="${type}"](around:3000, ${lat}, ${lng});
//       way["amenity"="${type}"](around:3000, ${lat}, ${lng});
//       relation["amenity"="${type}"](around:3000, ${lat}, ${lng});
//     );
//     out body;
//   `;

//   try {
//     const response = await axios.get(OSM_BASE_URL, {
//       params: { data: query },
//     });

//     // Extract places with Wikidata/Wikipedia tags
//     const places = response.data.elements.filter(
//       (place: any) =>
//         place.tags && (place.tags["brand:wikidata"] || place.tags["name:en"])
//     );
//     const detailedPlaces = await Promise.all(
//       places.map(async (place: any) => {
//         const wikiData = await fetchWikiDetails(
//           place.tags["brand:wikidata"],
//           place.tags["name:en"]
//         );
//         const data = {
//           wikidata: place.tags["brand:wikidata"],
//           wikipedia: place.tags["name:en"],
//         };
//         return {
//           name: place.tags["name:en"] || "Unknown",
//           coordinates: { lat: place.lat, lon: place.lon },
//           wikipedia: place.tags["brand:wikidata"],
//           wikidata: place.tags["name:en"],
//           wikiDetails: data.wikidata && data.wikipedia,
//         };
//       })
//     );
//     return detailedPlaces;

//   } catch (error) {
//     console.error("Error fetching nearby places from OSM:", error);
//     throw error;
//   }
// };


// const fetchWikiDetails = async (wikipedia?: string, wikidata?: any) => {
//   if (wikipedia) {
//     const lang = wikipedia;
//     const title = wikidata;

//     return fetchWikipediaDetails(lang, title);
//   }

//   return null;
// };


// const fetchWikipediaDetails = async (lang: string, title: string) => {
//   try {
//     const response = await axios.get(WIKIPEDIA_API_URL, {
//       params: {
//         action: "query",
//         titles: title,
//         prop: "extracts|pageimages",
//         format: "json",
//         piprop: "thumbnail",
//         pithumbsize: 400,
//         exintro: true,
//         explaintext: true,
//       },
//     });
// console.log(lang)
// console.log(title)

//     const pages = response.data.query.pages;
//    const page: any = Object.values(pages);
//    console.log(page)
//     return {
//       title: page?.title,
//       extract: page?.extract,
//       thumbnail: page?.thumbnail ? page?.thumbnail.source : null,
//       fullurl: `https://${lang}.wikipedia.org/wiki/${page.title}`,
//     };
//   } catch (error) {
//     console.error("Error fetching Wikipedia details:", error);
//     return null;
//   }
// };




// export default {
//   nearByPlace,
// };
