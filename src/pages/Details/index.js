import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import * as client from "../spotifyClient";
import * as our_client from "../client";
import "./index.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../hooks/useAuth";
import { Rating } from "react-custom-rating-component";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  const fetchSong = async () => {
    const test = localStorage.getItem("token");
    const jsonString = JSON.parse(test);
    if (!track) {
      return <Navigate to="/home" replace />;
    }
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
    getAverageRating(track._id);
  }, [track]);
  if (!track) {
    return <Navigate to="/home" replace />;
  }

  const steveSong = {
    spotify_id: "IDK",
    title: "IDK",
    artists: ["IDK", "PLS"],
    album_name: "IDK",
    release_date: "2014-11-10",
    album_art_url:
      "https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2",
    acousticness: 0.5,
    danceability: 0.5,
    energy: 0.5,
    instrumentalness: 0.5,
    loudness: 0.5,
  };

  return (
    <div className="">
      {track && (
        <div className="flex">
          <div className="flex flex-col items-center text-green">
            <img
              src={track.album_art_url}
              style={{ width: 200, height: 200 }}
              alt="album cover"
            />
            <div className="text-lg mt-6">
              <div className=" flex items-center flex-col gap-2">
                Average Rating
                <Rating defaultValue={2.3} readOnly={true} />
              </div>
            </div>
            <hr className="green-line w-full"></hr>
            <div className="text-lg">Recent Reviews:</div>
          </div>
          <div className="text-green flex flex-col">
            <div>
              <div className="">
                <div className="">{track.title}</div>
              </div>
              <div className="">
                <div className="">By: {track.artists[0]}</div>
                <div className="">
                  {moment(track.release_date).utc().format("MMM DD, Y")}
                </div>
              </div>
              <div className="">
                <p>Details</p>
                <hr></hr>
              </div>
            </div>

            {song && (
              <div className="p-flex-row-container">
                <ul className="text-green flex flex-col gap-2">
                  <SongSlider
                    name="Energy"
                    min={0}
                    max={100}
                    step={1}
                    value={song.energy}
                    left_label="No chill"
                    right_label="Chill"
                  ></SongSlider>
                  <SongSlider
                    name="Instrumentalness"
                    min={0}
                    max={100}
                    step={1}
                    value={song.instrumentalness}
                    left_label="None"
                    right_label="A ton"
                  ></SongSlider>
                  <SongSlider
                    name="Loudness"
                    value={8}
                    left_label="None"
                    right_label="A ton"
                  ></SongSlider>

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

                <div className="review">
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
                    <button
                      className="btn submit-button"
                      //TODO CREATE REVIEW API CALL using the review object
                      onClick={() => {
                        if (!user) {
                          navigate("/signup");
                        }
                        console.log("CLICKED ONCLICK");
                        our_client.createReview(review, track);
                      }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SongSlider({ value, min, max, step, left_label, right_label, name }) {
  return (
    <li>
      <label htmlFor="customRange1" className="form-label">
        {name}
      </label>
      <Slider min={min} max={max} step={step} value={value * 100} />
      <div className="bottom-labels mt-1 font-roboto">
        <label className="float-left">{left_label}</label>
        <label className="float-right">{right_label}</label>
      </div>
    </li>
  );
}
