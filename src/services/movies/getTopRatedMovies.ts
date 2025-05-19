import api from "../api";

export const getTopRatedMovies = async (pageSession:Number ) => {
  let res: any;
  const endpoint = `/movie/top_rated?language=en-US&page=${pageSession}`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data; // data solo es el nombre de la respuesta
      console.log(res)
    })
    .catch((err) => {
      res = err.response; // response trae todo la info del error
    });
  return res;
};
