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
import { GoDotFill } from "react-icons/go";
import { Review } from "../../components/Review";

// import * as userClient from "./users/client";
// import * as reviewsClient from "./reviews/client";

export function Details() {
  const { id } = useParams();
  const location = useLocation();
  const track = location.state && location.state.track;
  const [song, setSong] = useState([]);
  const [average_review, setAverageReview] = useState(null);
  const { user, logout } = useAuth();

  const [reviews, setReviews] = useState(null);

  const [isClicked, setIsClicked] = useState(false);

  const [review, setReview] = useState({
    favorited: false,
    rating: 5,
  });
  const navigate = useNavigate();

  const fetchSong = async (spotify_id) => {
    const test = localStorage.getItem("token");
    const jsonString = JSON.parse(test);
    if (!track) {
      return <Navigate to="/home" replace />;
    }
    const song_song = await client.getTrackAudioFeatures(
      jsonString.access_token,
      spotify_id
    );
    setSong(song_song);
  };
  const handleClick = () => {
    setReview({ ...review, favorited: !isClicked });
    setIsClicked(!isClicked);
  };
  const getAverageRating = async (spotify_id) => {
    //TODO make average review by SPOTIFY ID, not SONG ID
    const rating = await our_client.findAverageReview(spotify_id);
    setAverageReview(rating);
  };
  const getRecentReviews = async (spotify_id) => {
    //TODO make route for recent reviews by SPOTIFY ID, not SONG ID
    const reviews = await our_client.findReviewsBySpotifyId(spotify_id);
    setReviews(reviews);
  };

  useEffect(() => {
    fetchSong(track.spotify_id);
    getAverageRating(track.spotify_id);
    getRecentReviews(track.spotify_id);
  }, [track]);

  if (!track) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="">
      {track && (
        <div className="flex mt-5 gap-4 sm:gap-0">
          <div className="flex flex-col items-center text-green basis-1/6">
            <img
              src={track.album_art_url}
              style={{ width: 200, height: 200 }}
              alt="album cover"
              className="h-auto max-w-full rounded-md"
            />
            <div className="text-lg mt-6">
              <div className=" flex items-center flex-col gap-2 font-bold mb-2">
                Average Rating
                {average_review && (
                  <Rating
                    defaultValue={average_review}
                    readOnly={true}
                    activeColor="#eb8fcc"
                  />
                )}
              </div>
            </div>
            <div className="border-green w-full border-1  mt-2 mb-1 "></div>
            <div className="text-lg font-bold mt-2 mb-2">Recent Reviews:</div>
            <div className="flex flex-col gap-3 ">
              {reviews &&
                reviews.map((review, index) => (
                  <div
                    key={review.user_id}
                    className="relative sm:space-x-3   cursor-pointer flex flex-col sm:flex-row justify-between rounded-lg border border-[#C0EB8F] px-3 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 "
                  >
                    <div className="flex flex-col gap-4 items-center">
                      <div className=" flex flex-col gap-2">
                        <div className="text-lg font-bold">
                          <span className="text-base font-normal">
                            Review by
                          </span>{" "}
                          <Link
                            className="no-underline text-pink-text hover:text-purple"
                            to={`/profile/${review.user_id}`}
                          >
                            {review.username}
                          </Link>
                        </div>
                        <div className=" text-xs w-30 break-normal ">
                          {review.body}
                        </div>
                        <Rating
                          defaultValue={review.rating}
                          readOnly={true}
                          activeColor="#eb8fcc"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="text-green flex flex-col sm:ml-9 grow basis-5/6">
            <div className="flex flex-col">
              <div className="">
                <div className="font-bold text-4xl text-pink-text mb-2">
                  {track.title}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="">{track.artists[0]}</div>
                <GoDotFill />
                <div className="">
                  {moment(track.release_date).utc().format("MMM DD, Y")}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="border-beige w-full border-1 my-4"></div>
              </div>
            </div>

            {song && (
              <div className="flex flex-col sm:flex-row grow gap-5 mt-1">
                <div className="text-green basis-2/3 flex flex-col gap-3 grow">
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
                    max={1}
                    step={1}
                    value={song.instrumentalness}
                    left_label="None"
                    right_label="A ton"
                  ></SongSlider>
                  <SongSlider
                    name="Loudness"
                    min={-60}
                    max={0}
                    step={1}
                    value={song.loudness}
                    left_label="Quiet"
                    right_label="Loud"
                  ></SongSlider>
                  <SongSlider
                    name="Danceable"
                    min={0}
                    max={100}
                    step={1}
                    value={song.danceability}
                    left_label="Not at all"
                    right_label="Disco"
                  ></SongSlider>
                  <SongSlider
                    name="Acoustics"
                    min={0}
                    max={100}
                    step={1}
                    value={song.acousticness}
                    left_label="All digital"
                    right_label="All analog"
                  ></SongSlider>
                </div>

                <div className="flex flex-col basis-1/3 items-center gap-3 ">
                  {/* <div className="">
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
                  </div> */}
                  <div className=" w-full ">
                    <textarea
                      id="message"
                      rows="4"
                      onChange={(e) =>
                        setReview({ ...review, body: e.target.value })
                      }
                      class="block p-2.5 w-full text-sm text-gray-900 bg-amber-50 rounded-lg border  focus:ring-amber-50 focus:border-amber-50 dark:bg-amber-50 dark:border-amber-50 dark:placeholder-grey-600 dark:text-grey-600 dark:focus:ring-amber-50 dark:focus:border-amber-50"
                      placeholder="Leave a comment..."
                    ></textarea>
                    {/* <textarea
                      className="rounded-md bg-amber-5 mt-4 text-gray-700"
                      id="leaveAComment"
                      rows={8}
                      onChange={(e) =>
                        setReview({ ...review, body: e.target.value })
                      }
                    ></textarea> */}
                  </div>
                  <div className="flex justify-between  w-full">
                    <div>
                      <Rating
                        defaultValue={
                          review && review.rating ? review.rating : 0
                        }
                        precision={0.5}
                        activeColor="#eb8fcc"
                        onChange={(newRating) =>
                          setReview({
                            ...review,
                            rating: parseFloat(newRating),
                          })
                        }
                      />
                    </div>
                    <div>
                      <button onClick={handleClick} type="button">
                        {isClicked ? (
                          <FaHeart className="w-6 h-6" />
                        ) : (
                          <FaRegHeart className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="bg-purple hover:bg-pink-text mt-2 rounded-md no-underline text-base get-started-button px-3.5 py-2.5 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      //TODO CREATE REVIEW API CALL using the review object
                      onClick={() => {
                        if (!user) {
                          navigate("/signup");
                        }

                        const new_review = {
                          title: track.title,
                          artists: track.artists,
                          album_name: track.album,
                          release_date: track.release_date,
                          album_art_url: track.album_art_url,
                          song_id: track.id,
                          user_id: user._id,
                          username: user.username,
                          ...review,
                        };

                        console.log("CLICKED ONCLICK", new_review);
                        our_client.createReview(new_review, track);
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
    <div>
      <label
        htmlFor="customRange1"
        className="text-base mt-1 mb-2 font-bold text-pink-text"
      >
        {name}:
      </label>
      <Slider min={min} max={max} step={step} value={value * 100} />
      <div className="bottom-labels mb-4 mt-1 font-roboto">
        <label className="float-left">{left_label}</label>
        <label className="float-right">{right_label}</label>
      </div>
    </div>
  );
}
