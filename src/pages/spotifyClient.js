/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
 */

export async function getToken() {
  var Buffer = require("buffer/").Buffer;

  console.log(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET,
    process.env.REACT_APP_BASE_URL,
    process.env
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          "5b5f7d5833cc470f8fc1e065e5cc9df6" +
            ":" +
            "0f50e7454cb64c9ba244867b94473e48"
        ).toString("base64"),
    },
    json: true,
  });

  return await response.json();
}

export async function getTrackInfo(access_token) {
  const response = await fetch(
    "https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT",
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  return await response.json();
}

export async function getTrackAudioFeatures(access_token, trackId) {
  const response = await fetch(
    "https://api.spotify.com/v1/audio-features/" + trackId,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  return await response.json();
}

getToken().then((response) => {
  getTrackInfo(response.access_token).then((profile) => {
    console.log(profile);
  });
});

export function formatData(data) {
  const formattedData = data.map((track) => {
    const formattedArtists = track.artists.map((artist) => {
      return artist.name;
    });
    return {
      //TODO we need a spotify_id and (song)_id for the purposes of getting avgRating
      spotify_id: track.id,
      album_name: track.album.name,
      title: track.name,
      album_art_url: track.album.images[0].url,
      artists: formattedArtists,
      album: track.album.name,
      release_date: track.album.release_date,
      duration: track.duration_ms,
      preview_url: track.preview_url,
    };
  });

  return formattedData;
}
