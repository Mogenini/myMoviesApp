import api from "../api";

export const getNowPlayingMovies = async (pageSession:Number) => {
  let res: any;
  const endpoint = `/movie/now_playing?language=en-US&page=${pageSession}`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data; // data solo es el nombre de la respuesta
    })
    .catch((err) => {
      res = err.response; // response trae todo la info del error
    });
  return res;
};