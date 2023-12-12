import "./index.css";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import moment from 'moment';

export function Profile() {
  const { user, logout } = useAuth();
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
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
  useEffect(() => {
    console.log("FETCHING ACCOUNT");

    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);
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
  let birthday = new Date()
  // get reviews
  if (user && account) {
    return (
      <div class="">
        <div class="row profile d-flex align-content-center">
          <div class="col-3">
            <FaUser size={150} />
          </div>
          <div class="col-9">
            <div class="list-group account">
              <div class="list-group-item green-text">
                {/* <font class="font-semibold" size="5">Aarohi Nadkarni</font> */}
                <font size="5">
                  {account.first_name} {account.last_name}
                </font>
              </div>
              {user._id === account._id && 
              <div class="list-group-item green-text">
                {/* 7/23/2003 */}
                {moment(account.dob).utc().format("MMM DD, Y")}
              </div>}
              {user._id === account._id && 
              <div class="list-group-item green-text">
                {/* nadkarni.aa@northeastern.edu */}
                {account.email}
              </div>}
              <div class="list-group-item green-text">
                {/* blah blah blah */}
                {account.biography}
              </div>
              {user._id === account._id && 
              <div class="list-group-item green-text">
                <Link
                  to={`/profile/edit/${account._id}`}
                  className="rounded-md no-underline bg-indigo-600 edit-profile-button px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  style={{ color: "#333333" }}
                >
                  Edit profile
                </Link>

                <Link
                  to="/home"
                  className="rounded-md no-underline bg-indigo-600 edit-profile-button px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  style={{ color: "#333333", marginLeft:"10px"}}
                  onClick={signout}
                >
                  Signout
                </Link>
              </div>}
            </div>
          </div>
        </div>
        <div class="user-specific-account">
          <div class="favorite-songs green-text">
            <h4>FAVORITE SONGS</h4>
            <div class="row">
              {favorites.map((favorite, index) => (
                <div key={index} class="col-auto">
                  <img src={favorite.image} alt="..." width="150" />
                </div>
              ))}
            </div>
          </div>
          <div class="recent-reviews green-text">
            <h4>RECENT REVIEWS</h4>
            <div class="row">
              {recentReviews.map((recent, index) => (
                <div key={index} class="col-auto">
                  <img src={recent.image} alt="..." width="150" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="">
        <div class="row profile d-flex align-content-center">
          <div class="col-3">
            <FaUser size={150} />
          </div>
          <div class="col-9">
            <div class="list-group account">
              <div class="list-group-item green-text">
                <font size="5">Aarohi Nadkarni</font>
                {/* <font size="5">{account.first_name} {account.last_name}</font> */}
              </div>
              <div class="list-group-item green-text">
                blah blah blah
                {/* {account.biography} */}
              </div>
            </div>
          </div>
        </div>
        <div class="user-specific-account">
          <div class="favorite-songs green-text">
            <h4>FAVORITE SONGS</h4>
            <div class="row">
              {favorites.map((favorite, index) => (
                <div key={index} class="col-auto">
                  <img src={favorite.image} alt="..." width="150" />
                </div>
              ))}
            </div>
          </div>
          <div class="recent-reviews green-text">
            <h4>RECENT REVIEWS</h4>
            <div class="row">
              {recentReviews.map((recent, index) => (
                <div key={index} class="col-auto">
                  <img src={recent.image} alt="..." width="150" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
