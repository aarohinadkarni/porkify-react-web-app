import "./index.css";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export function Edit() {
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
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);

  if (!user) {
    navigate("/signup");
  } else if (user._id !== id) {
    navigate("/profile");
  }

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
  return (
    // first name
    // last name
    // dob
    // profile picture
    // email
    // bio
    // list of favorites
    // list of recent reviews
    // edit profile button
    <div class="">
      <div class="row profile d-flex align-content-center">
        <div class="col-3">
          <FaUser className="w-50 h-50 mt-5" />
        </div>
        <div class="col-9">
          <div class="list-group">
            {account && (
              <div class="list-group-item green-text font-semibold">
                First Name:
                {/* <input className="form-control" value="Aarohi" onChange={(e) => setAccount({ ...account, first_name: e.target.value }) } style={{ display:"inline"}}/> */}
                <input
                  className="form-control"
                  value={account.first_name}
                  onChange={(e) =>
                    setAccount({ ...account, first_name: e.target.value })
                  }
                  style={{ display: "inline" }}
                />
              </div>
            )}
            {account && (
              <div class="list-group-item green-text font-semibold">
                Last Name:
                {/* <input className="form-control" value="Nadkarni" onChange={(e) => setAccount({ ...account, last_name: e.target.value }) } style={{ display:"inline"}}/> */}
                <input
                  className="form-control"
                  value={account.last_name}
                  onChange={(e) =>
                    setAccount({ ...account, last_name: e.target.value })
                  }
                  style={{ display: "inline" }}
                />
              </div>
            )}
            {account && (
              <div class="list-group-item green-text font-semibold">
                Birthday:
                {/* <input className="form-control" type="date" onChange={(e) => setAccount({ ...account, dob: e.target.value }) } style={{ display:"inline"}}/> */}
                <input
                  className="form-control"
                  type="date"
                  value={account.dob}
                  onChange={(e) =>
                    setAccount({ ...account, dob: e.target.value })
                  }
                  style={{ display: "inline" }}
                />
              </div>
            )}
            {account && (
              <div class="list-group-item green-text font-semibold">
                Email
                {/* <input className="form-control" value="nadkarni.aa@northeastern.edu" onChange={(e) => setAccount({ ...account, email: e.target.value }) } style={{ display:"inline"}}/> */}
                <input
                  className="form-control"
                  value={account.email}
                  onChange={(e) =>
                    setAccount({ ...account, email: e.target.value })
                  }
                  style={{ display: "inline" }}
                />
              </div>
            )}
            {account && (
              <div class="list-group-item green-text font-semibold">
                Biography
                <textarea
                  className="form-control"
                  value={account.biography}
                  onChange={(e) =>
                    setAccount({ ...account, biography: e.target.value })
                  }
                  style={{ display: "inline" }}
                />
              </div>
            )}
            <div class="list-group-item green-text">
              <Link
                to="/profile"
                className="rounded-md no-underline hover:bg-pink-text text-white bg-purple px-3.5 py-2.5 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ color: "#333333" }}
                onClick={save}
              >
                Save profile
              </Link>
              {
                // need to add like actual changing of user fields in database to this button somehow i don't know how rn
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
