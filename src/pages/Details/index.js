import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import * as client from "../spotifyClient";
import * as our_client from "../client";
import "./index.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";

// import * as userClient from "./users/client";
// import * as reviewsClient from "./reviews/client";

export function Details() {
  const { id } = useParams();
  const location = useLocation();
  const track = location.state && location.state.track;
  const [song, setSong] = useState([]);
  const [average_review, setAverageReview] = useState([]);
  const { user, logout } = useAuth();

  const [isClicked, setIsClicked] = useState(false);

  const [review, setReview] = useState({
    user_id: user._id, song_id: id, favorited: false, rating: 0.0, body: "", is_taken_down: false, reason_for_taken_down: ""
  });

  const fetchSong = async () => {
    const test = localStorage.getItem("token");
    const jsonString = JSON.parse(test);
    if (!track) {return <Navigate to="/home" replace />;}
    const idToUse = track.id ? track.id : id;
    const song_song = await client.getTrackAudioFeatures(
      jsonString.access_token,
      idToUse
    );
    setSong(song_song);
  };
  const handleClick = () => {
    setReview({ ...review, favorited: !isClicked });
    setIsClicked(!isClicked);
  };
  const getAverageRating = async (song_id) => {
    const rating = await our_client.findAverageReview(song_id);
    setAverageReview(rating);
  };

  useEffect(() => {
    fetchSong();
    getAverageRating(id);
  }, [track]);
  if (!track) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="">
      {track && (
        <div className="flex">
          <div>
            <img
              src={track.album_art_url}
              style={{ width: 200, height: 200 }}
              alt="album cover"
            />
            <div className="ratings-title">
              Average Rating: {average_review} / 5
            </div>

            <hr className="green-line"></hr>
            <h3 className="ratings-title">Recent reviews:</h3>
          </div>
          <div>
            <div className="flex-container">
              <span className="float-left">
                <h1 className="song-title float-left">{track.title}</h1>
              </span>
              <span className="float-right">
                <h2 className="artist-name float-right">
                  By: {track.artists[0]}
                </h2>
                <h2 className="song-year float-right">
                  {moment(track.release_date).utc().format("MMM DD, Y")}
                </h2>
              </span>
            </div>

            <br></br>
            <br></br>
            <div className="details-under-song-title">
              <p>Details</p>
              <hr></hr>
            </div>
            {song && (
              <div className="p-flex-row-container">
                <ul>
                  <li>
                    <label
                      htmlFor="customRange1"
                      className="form-label"
                      style={{ color: "#C0EB8F" }}
                    >
                      Energy
                    </label>
                    <input
                      type="range"
                      className="form-range "
                      id="customRange1"
                      disabled
                      value={song.energy}
                      min="0"
                      max="1"
                      step="0.1"
                    />
                    <div className="bottom-labels">
                      <label
                        className="float-left"
                        style={{ color: "#C0EB8F" }}
                      >
                        No chill
                      </label>
                      <label
                        className="float-right"
                        style={{ color: "#C0EB8F" }}
                      >
                        Chill
                      </label>
                    </div>
                  </li>
                  <br></br>
                  <li>
                    <label
                      htmlFor="customRange1"
                      className="form-label"
                      style={{ color: "#C0EB8F" }}
                    >
                      Instrumentalness
                    </label>
                    <input
                      type="range"
                      className="form-range range-thumb"
                      id="customRange1"
                      disabled
                      value={song.instrumentalness}
                      min="0"
                      max="1"
                      step="0.1"
                    />
                    <div className="bottom-labels">
                      <label
                        className="float-left"
                        style={{ color: "#C0EB8F" }}
                      >
                        None
                      </label>
                      <label
                        className="float-right"
                        style={{ color: "#C0EB8F" }}
                      >
                        A ton
                      </label>
                    </div>
                  </li>
                  <br></br>
                  <li>
                    <label
                      htmlFor="customRange1"
                      className="form-label"
                      style={{ color: "#C0EB8F" }}
                    >
                      Loudness
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      disabled
                      value={song.loudness}
                      min="-60"
                      max="0"
                      step="1"
                    />
                    <div className="bottom-labels">
                      <label
                        className="float-left"
                        style={{ color: "#C0EB8F" }}
                      >
                        Quiet
                      </label>
                      <label
                        className="float-right"
                        style={{ color: "#C0EB8F" }}
                      >
                        Loud
                      </label>
                    </div>
                  </li>
                  <br></br>
                  <li>
                    <label
                      htmlFor="customRange1"
                      className="form-label"
                      style={{ color: "#C0EB8F" }}
                    >
                      Danceable
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      disabled
                      value={song.danceability}
                      min="0"
                      max="1"
                      step="0.1"
                    />
                    <div className="bottom-labels">
                      <label
                        className="float-left"
                        style={{ color: "#C0EB8F" }}
                      >
                        Not at all
                      </label>
                      <label
                        className="float-right"
                        style={{ color: "#C0EB8F" }}
                      >
                        Disco
                      </label>
                    </div>
                  </li>
                  <br></br>
                  <li>
                    <label
                      htmlFor="customRange1"
                      className="form-label"
                      style={{ color: "#C0EB8F" }}
                    >
                      Acoustics
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      disabled
                      value={song.acousticness}
                      min="0"
                      max="1"
                      step="0.1"
                      style={{
                        color: "#d3d3d3",
                      }}
                    />
                    <div className="bottom-labels">
                      <label
                        className="float-left"
                        style={{ color: "#C0EB8F" }}
                      >
                        All digital
                      </label>
                      <label
                        className="float-right"
                        style={{ color: "#C0EB8F" }}
                      >
                        All analog
                      </label>
                    </div>
                  </li>
                </ul>

                <form className="review">
                  <div className="form-group like-button">
                    <button onClick={handleClick} type="button">
                      {isClicked ? (
                        <FaHeart className="like-heart-favorited" />
                      ) : (
                        <FaRegHeart className="like-heart" />
                      )}
                      {isClicked ? (
                        <h3 className="like-title">Favorited</h3>
                      ) : (
                        <h3 className="like-title">Favorite</h3>
                      )}
                    </button>
                  </div>
                  <div className="form-group rate-range">
                    <label htmlFor="customRange1" className="form-label">
                      Rate
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      min="0"
                      max="5"
                      step="0.5"
                      onChange={(e) =>
                        setReview({
                          ...review,
                          rating: parseFloat(e.target.value),
                        })
                      }
                    />
                    <div className="bottom-labels">
                      <label className="float-left">0</label>
                      <label className="float-right">5</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="leave-a-comment" htmlFor="leaveAComment">
                      Leave a comment
                    </label>
                    <textarea
                      className="form-control"
                      id="leaveAComment"
                      rows="4"
                      onChange={(e) =>
                        setReview({ ...review, body: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button className="btn submit-button"
                      //TODO CREATE REVIEW API CALL using the review object
                      onClick={() => our_client.createReview(review)}
                    >SUBMIT</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
