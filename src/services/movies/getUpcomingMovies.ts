import api from "../api";

export const getUpcomingMovies = async (pageSession:Number ) => {
  let res: any;
  const endpoint = `/movie/upcoming?language=en-US&page=${pageSession}`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data.results; // data solo es el nombre de la respuesta
    })
    .catch((err) => {
      res = err.response; // response trae todo la info del error
    });
  return res;
};