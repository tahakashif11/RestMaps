const API_KEY = '2a54ec8c1bmshbc6d09965937ac5p141b50jsne4194616f85f';
const API_HOST = 'trueway-places.p.rapidapi.com';

export const fetchCafes = async (latitude, longitude, radius = 15000) => {
    console.log('Fetching cafes...');
    const url = `https://${API_HOST}/FindPlacesNearby?location=${latitude},${longitude}&type=cafe&radius=${radius}&language=en`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log('Cafe data:', result);
      if (result && result.results) {
        const cafeLocations = result.results.map((cafe, index) => ({
          id: index,
          name: cafe.name,
          latitude: cafe.location.lat,
          longitude: cafe.location.lng,
        }));
        console.log('Cafe locations:', cafeLocations);
        return cafeLocations;
      }
    } catch (error) {
      console.error(error);
    }
  
    return [];
  };
