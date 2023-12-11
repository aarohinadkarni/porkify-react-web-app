/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
 */

const client_id = "5b5f7d5833cc470f8fc1e065e5cc9df6";
const client_secret = "0f50e7454cb64c9ba244867b94473e48";

export async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic BQChozzbFzDMj_oQfKETovF6bW_nFyeGVFun3nmTLu4o5EcpbiKzE-bifHX_UloK0NcMZT0F1-pyloq00iEqSf8CSJO1YYf0zJRn_cDxK_lZZb0bMUQ",
    },
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

getToken().then((response) => {
  getTrackInfo(response.access_token).then((profile) => {
    console.log(profile);
  });
});
