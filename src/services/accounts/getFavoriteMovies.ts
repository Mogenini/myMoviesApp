import api from "../api";

export const getFavoriteMovies = async (guestSessionId: string,pageSession: Number ) => {
  try {
    const { data } = await api.get(
      `/account/${guestSessionId}/favorite/movies?language=en-US&page=${pageSession}&sort_by=created_at.asc`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
