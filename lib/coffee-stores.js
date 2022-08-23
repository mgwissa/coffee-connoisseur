import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  console.log(unsplashResults);

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("42.63391583673063%2C-83.2209005439434", "coffee", 6),
    options
  );
  const data = await response.json();
  return data.results.map((result, index) => {
    const locality = result.location.locality;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighborhood: locality.length > 0 ? locality[0] : "",
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
  // .catch((err) => console.error(err));
};
