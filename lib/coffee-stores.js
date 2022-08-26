import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.74925011418037,-79.45976886643436",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3dp1IMi7bOieHQoOWblg63/yxkJKxyTSuyTbhkJHSuAU=",
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
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
