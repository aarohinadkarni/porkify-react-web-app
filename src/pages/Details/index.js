import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import * as client from "../spotifyClient";
import * as our_client from "../client";
import "./index.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";

// import * as userClient from "./users/client";
// import * as reviewsClient from "./reviews/client";

export function Details() {
  const { id } = useParams();
  const location = useLocation();
  const track = location.state && location.state.track;
  const [song, setSong] = useState([]);
  const [average_review, setAverageReview] = useState([]);

  const [isClicked, setIsClicked] = useState(false);
  const fetchSong = async () => {
    const test = localStorage.getItem("token");
    const jsonString = JSON.parse(test);
    const song_song = await client.getTrackAudioFeatures(
      jsonString.access_token,
      track.id
    );
    setSong(song_song);
  };
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const getAverageRating = async (song_id) => {
    const rating = await our_client.findAverageReview(song_id);
    setAverageReview(rating);
  };
  
  useEffect(() => {
    console.log(location.state);
    fetchSong();
    getAverageRating(id);
  }, [track]);

  if (!track) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="">
      {track && (
        <div className="mt-10 song-details-header p-flex-row-container flex justify-content-center">
          <div>
            <img
              src={track.album.images[1].url}
              style={{ width: 300, height: 300 }}
              alt="album cover"
            />
            <h3 className="ratings-title">Average Rating:    {average_review} / 5</h3>
         
            <hr className="green-line"></hr>
            <h3 className="ratings-title">Ratings</h3>
          </div>
          <div>
              <div className="flex-container">
              <span className="float-left">
                <h1 className="song-title float-left">{track.name}</h1>
              </span>
              <span className="float-right">
                <h2 className="artist-name float-right">
                  By: {track.artists[0].name}
                </h2>
                <h2 className="song-year float-right">
                  {track.album.release_date}
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
                      <label htmlFor="customRange1" className="form-label" style={{color:"#C0EB8F"}}>
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
                        <label className="float-right" style={{color:"#C0EB8F"}}>No chill</label>
                        <label className="float-left" style={{color:"#C0EB8F"}}>Chill</label>
                      </div>
                    </li>
                    <br></br>
                    <li>
                      <label htmlFor="customRange1" className="form-label" style={{color:"#C0EB8F"}}>
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
                        <label className="float-left" style={{color:"#C0EB8F"}}>None</label>
                        <label className="float-right" style={{color:"#C0EB8F"}}>A ton</label>
                      </div>
                    </li>
                    <br></br>
                    <li>
                      <label htmlFor="customRange1" className="form-label" style={{color:"#C0EB8F"}}>
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
                        <label className="float-left" style={{color:"#C0EB8F"}}>Quiet</label>
                        <label className="float-right" style={{color:"#C0EB8F"}}>Loud</label>
                      </div>
                    </li>
                    <br></br>
                    <li>
                      <label htmlFor="customRange1" className="form-label" style={{color:"#C0EB8F"}}>
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
                        <label className="float-left" style={{color:"#C0EB8F"}}>Not at all</label>
                        <label className="float-right" style={{color:"#C0EB8F"}}>Disco</label>
                      </div>
                    </li>
                    <br></br>
                    <li>
                      <label htmlFor="customRange1" className="form-label" style={{color:"#C0EB8F"}}>
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
                        <label className="float-left" style={{color:"#C0EB8F"}}>All digital</label>
                        <label className="float-right" style={{color:"#C0EB8F"}}>All analog</label>
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
                  ></textarea>
                </div>
                <div className="form-group">
                  <button className="btn submit-button">SUBMIT</button>
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
