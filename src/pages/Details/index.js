import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "../client";
import album from "./album-cover.jpeg";
import "./index.css";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
// import * as userClient from "./users/client";
// import * as reviewsClient from "./reviews/client";

export function Details() {
  const { id } = useParams();
  
  //   const [currentUser, setCurrentUser] = useState(null);
  //   const [album, setAlbum] = useState(null);
    const [song, setSong] = useState([]);
  //   const { albumId } = useParams();
  //   const [likes, setLikes] = useState([]);

  //   const fetchUser = async () => {
  //     try {
  //       const user = await userClient.account();
  //       setCurrentUser(user);
  //     } catch (error) {
  //       setCurrentUser(null);
  //     }
  //   };

    const findSongById = async () => {
      const song = await client.findSong(id);
      setSong(song);
    };
  //   const fetchTracks = async () => {
  //     const tracks = await client.findTracksByAlbumId(albumId);
  //     setTracks(tracks);
  //   };

  //   const fetchLikes = async () => {
  //     const likes = await likesClient.findUsersThatLikeAlbum(albumId);
  //     setLikes(likes);
  //   };

  //   const currenUserLikesAlbum = async () => {
  //     const _likes = await likesClient.createUserLikesAlbum(
  //       currentUser._id,
  //       albumId
  //     );
  //     setLikes([_likes, ...likes]);
  //   };

  //   useEffect(() => {
  //     fetchAlbum();
  //     fetchTracks();
  //     fetchUser();
  //     fetchLikes();
  //   }, []);
  useEffect(() => {
      findSongById(id);
  }, []);
  return (
    <div>
      <div className="song-details-header p-flex-row-container justify-content-center">
        <div>
          <img
            src={album}
            style={{ width: 300, height: 300 }}
            alt="album cover"
          />
        </div>
        <div>
          <div className="p-flex-row-container">
            {/* <h1 className="song-title">Let It Happen</h1> */}
            <h1 className="song-title">{song.title}</h1>
            {/* <h2 className="song-year">2023</h2> */}
            <h2 className="song-year">{song.release_date}</h2>
            {/* <h2 className="artist-name">By: Tame Impala</h2> */}
            <h2 className="artist-name">By: {song.artists}</h2>
          </div>
          <div className="details-under-song-title">
            <p>Details</p>
            <hr></hr>
            <ul>
              <li>
                <label for="customRange1" class="form-label">
                  Popularity
                </label>
                <input type="range" class="form-range" id="customRange1" />
                <div className="bottom-labels">
                  <label class="float-left">Playing at bars</label>
                  <label class="float-right">World Tour</label>
                </div>
              </li>
              <br></br>
              <li>
                <label for="customRange1" class="form-label">
                  Energy
                </label>
                <input type="range" class="form-range" id="customRange1" />
                <div className="bottom-labels">
                  <label class="float-left">Playing at bars</label>
                  <label class="float-right">World Tour</label>
                </div>
              </li>
              <br></br>
              <li>
                <label for="customRange1" class="form-label">
                  Vocals
                </label>
                <input type="range" class="form-range" id="customRange1" />
              </li>
              <br></br>
              <li>
                <label for="customRange1" class="form-label">
                  Tempo
                </label>
                <input type="range" class="form-range" id="customRange1" />
              </li>
              <br></br>
              <li>
                <label for="customRange1" class="form-label">
                  Danceable
                </label>
                <input type="range" class="form-range" id="customRange1" />
              </li>
              <br></br>
              <li>
                <label for="customRange1" class="form-label">
                  Mood
                </label>
                <input type="range" class="form-range" id="customRange1" />
              </li>
              <br></br>
              <li>
                <label for="customRange1" class="form-label">
                  Acoustics
                </label>
                <input type="range" class="form-range" id="customRange1" />
              </li>
            </ul>
          </div>
        </div>
        <form className="review">
          <div className="form-group like-button">
            <button>
              <FaRegHeart className="like-heart" />
            </button>
            <h3 className="like-title">Favorite</h3>
          </div>
          <div className="form-group rate-range">
            <label for="customRange1" class="form-label">
              Rate
            </label>
            <input type="range" class="form-range" id="customRange1" min="0" max="5" step="0.5" />
            <div className="bottom-labels">
                  <label class="float-left">0</label>
                  <label class="float-right">5</label>
                </div>
          </div>
          <div class="form-group">
            <label className="leave-a-comment" for="leaveAComment">
              Leave a comment
            </label>
            <textarea
              class="form-control"
              id="leaveAComment"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn submit-button">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>

    // <div>
    //   {album && (
    //     <div>
    //       {currentUser && (
    //         <button
    //           onClick={currenUserLikesAlbum}
    //           className="btn btn-warning float-end"
    //         >
    //           Like
    //         </button>
    //       )}
    //       <h1>{album.name}</h1>
    //       <img
    //         src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/300x300.jpg`}
    //         alt={album.name}
    //       />
    //       <h2>Likes</h2>
    //       <ul className="list-group">
    //         {likes.map((like, index) => (
    //           <li key={index} className="list-group-item">
    //             {like.user.firstName} {like.user.lastName}
    //             <Link to={`/project/users/${like.user._id}`}>
    //               @{like.user.username}
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>

    //       <h2>Tracks</h2>
    //       <ul className="list-group">
    //         {tracks.map((track, index) => (
    //           <li key={index} className="list-group-item">
    //             <h3>{track.name}</h3>
    //             <audio controls>
    //               <source src={track.previewURL} type="audio/mpeg" />
    //             </audio>
    //           </li>
    //         ))}
    //       </ul>
    //       <pre>{JSON.stringify(tracks, null, 2)}</pre>
    //     </div>
    //   )}
    // </div>
  );
}
