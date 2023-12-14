import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const SONGS_API = `${BASE_API}/api/songs`;
export const REVIEWS_API = `${BASE_API}/api/reviews`;

export const createSong = async (song) => {
  try {
    const response = await request.post(`${SONGS_API}`, song);

    return response.data;
  } catch (error) {
    console.log("SONG ERRROR");
    console.log(error);
  }
};

export const createReview = async (review, song) => {
  try {
    let created_song;
    if (song.spotify_id) {
      created_song = await createSong(song);
    } else {
      created_song = await createSong({ ...song, spotify_id: song.id });
    }
    console.log(created_song, "BLERNER", review, song);
    const response = await request.post(`${REVIEWS_API}`, {
      ...review,
      song_id: created_song._id,
      album_art_url: created_song.album_art_url,
    });

    return response.data;
  } catch (error) {
    console.log("MATTHIAS");
    console.log(error);
  }
};

export const signin = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};
export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};
export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};
export const deleteUser = async (user) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
export const signup = async (credentials) => {
  const response = await request.post(`${USERS_API}/signup`, credentials);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};
export const findSong = async (spotify_id) => {
  const response = await request.get(`${SONGS_API}/${spotify_id}`);
  return response.data;
};
export const findReviewsByUserId = async (user_id) => {
  const response = await request.get(`${USERS_API}/${user_id}/reviews`);
  return response.data;
};
export const findAverageReview = async (spotify_id) => {
  const response = await request.get(
    `${SONGS_API}/${spotify_id}/spotify/avgRating`
  );
  return response.data;
};
export const findReviewsBySongId = async (song_id) => {
  const response = await request.get(`${SONGS_API}/${song_id}/reviews`);
  return response.data;
};

export const findReviewsBySpotifyId = async (spotify_id) => {
  const response = await request.get(
    `${SONGS_API}/${spotify_id}/spotify/reviews`
  );
  return response.data;
};
