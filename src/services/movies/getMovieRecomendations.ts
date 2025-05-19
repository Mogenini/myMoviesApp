import api from "../api";
export const getMovieRecommendations = async (id: string) => {
  try {
    const { data } = await api.get(`/movie/${id}/recommendations`);
    return data;
  } catch (error) {
    throw error;
  }
};

/*
JSON that we recieve: 
{
  "page": 
  "results": [ -> [Contains all of the information of movies ]
    {
      "backdrop_path",
      "id": ,
      "title": ,
      "original_title": ,
      "overview": ,
      "poster_path": ,
      "media_type":,
      "adult": false,
      "original_language": ,
      "genre_ids": [
        35,
        18,
        10402
      ],
      "popularity": ,
      "release_date": ,
      "video": ,
      "vote_average": ,
      "vote_count": 
    },
*/