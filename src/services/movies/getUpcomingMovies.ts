import api from "../api";

export const getUpcomingMovies = async () => {
  let res: any;
  const endpoint = "/movie/upcoming?language=en-US&page=1";
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