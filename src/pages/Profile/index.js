import "./index.css";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import { Review } from "../../components/Review";

export function Profile() {
  const { user, logout } = useAuth();
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [favorited_reviews, setFavoritedReviews] = useState(null);

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    console.log(user, "WHAT");
    setAccount(user);
  };

  const navigate = useNavigate();

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    logout();
    navigate("/home");
  };

  const findReviewsByUserId = async (id) => {
    const reviews = await client.findReviewsByUserId(id);
    console.log(reviews, "FOUND REVIEWS");
    setReviews(reviews);
    setFavoritedReviews(reviews.filter((review) => review.review.favorited));
    console.log(favorited_reviews);
  };

  // const findFavoritedReviewsByUserId = async (id) => {
  //   const favoritedReviews = reviews.map((review) => (review.favorited === true));
  //   setFavoritedReviews(favoritedReviews);
  // };

  useEffect(() => {
    console.log("FETCHING ACCOUNT", id);

    if (id) {
      console.log("MADE IT TO ID");
      findUserById(id);
      findReviewsByUserId(id);
      console.log("favorited reviews", favorited_reviews);
    } else if (user) {
      fetchAccount();
      findReviewsByUserId(user._id);
      console.log("favorited reviews", favorited_reviews);
    }
  }, [id]);
  // get favorites
  const favorites = [
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965",
    },
  ];
  const recentReviews = [
    {
      image: "https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26",
    },
  ];
  let birthday = new Date();
  // get reviews
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  if (account) {
    return (
      <div class="flex flex-col mx-4 my-4">
        <div class="sm:row sm:profile sm:d-flex sm:flex-row sm:align-content-center flex">
          <div class="grow flex-1">
            <div class="mt-4 account text-[#c0eb8f] flex gap-3 items-center text-sm sm:text-base">
              <FaUser className="mr-3 ml-3 text-pink-text" size={150} />
              <div className="flex flex-col gap-2 ">
                <div class="  mt-3 font-bold text-pink-text">
                  <font size="5">
                    {account.first_name} {account.last_name}
                  </font>
                </div>
                {user._id === account._id && (
                  <div class=" green-text">
                    {moment(account.dob).utc().format("MMM DD, Y")}
                  </div>
                )}
                {user._id === account._id && (
                  <div class=" green-text">{account.email}</div>
                )}
                <div class=" green-text">{account.biography}</div>
                {user._id === account._id && (
                  <div class=" green-text my-3">
                    <Link
                      to={`/profile/edit/${account._id}`}
                      className="rounded-md no-underline hover:bg-pink-text text-white bg-purple px-3.5 py-2.5 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit
                    </Link>

                    <Link
                      to="/home"
                      className=" rounded-md no-underline text-white bg-purple edit-profile-button px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-pink-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      style={{
                        marginBottom: "3px",
                        marginLeft: "10px",
                      }}
                      onClick={signout}
                    >
                      Signout
                    </Link>

                    {user.is_moderator && (
                      <Link
                        to="/admin"
                        className="bg-purple text-white rounded-md no-underline hover:bg-pink-text  px-3.5 py-2.5 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        style={{ marginLeft: "10px" }}
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="user-specific-account">
          <div class="favorite-songs green-text">
            <h4 className="font-bold mb-4 mt-4 text-pink-text">
              FAVORITE SONGS
            </h4>
            <div class="row gap-2">
              {favorited_reviews && favorited_reviews.length !== 0 && (
                <div className="flex gap-5 flex-col">
                  <div className="flex gap-3">
                    {[...Array(5)].map((x, i) => (
                      <Card track={favorited_reviews[i]} key={i} size={200} />
                    ))}
                  </div>
                </div>
              )}
              {favorited_reviews && favorited_reviews.length === 0 && (
                <div>
                  <h6>
                    {account.first_name} {account.last_name} has not favorited
                    any songs yet!
                  </h6>
                </div>
              )}
            </div>
          </div>
          <div class="recent-reviews green-text">
            <h4 className="font-bold mb-4 mt-4 text-pink-text">
              RECENT REVIEWS
            </h4>
            <div class="flex flex-col gap-4">
              {reviews &&
                reviews.map((recent, index) => (
                  <Review key={index} data={recent} />
                ))}
            </div>
            {reviews && reviews.length === 0 && (
              <div>
                <h6>
                  {account.first_name} {account.last_name} has not reviewed any
                  songs yet!
                </h6>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function Card({ track, size }) {
  return (
    <div>
      {track && (
        <div className="">
          {/* <Link to={`/details`}> */}
          <Link
            to={`/details/${track.review.song_id}`}
            state={{ track: track.song }}
          >
            <img
              className="rounded-md hover:opacity-50 hover:cursor-pointer  "
              width={size}
              src={track.song.album_art_url}
              // src="https://i1.sndcdn.com/artworks-9HEHEhiFEVpP-0-t500x500.jpg"
            ></img>
          </Link>
        </div>
      )}
    </div>
  );
}
