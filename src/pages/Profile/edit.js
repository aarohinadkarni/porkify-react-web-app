import "./index.css"
import * as client from "../client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export function Edit() {
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
        navigate("/project/signin");
    };
    useEffect(() => {
        if (id) {
        findUserById(id);
        } else {
        fetchAccount();
        }
    }, []);
    const favorites = [{image:"https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965"},{image:"https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965"},{image:"https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965"},{image:"https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965"},{image:"https://i.scdn.co/image/ab67616d0000b273b2592bea12d840fd096ef965"}]
    const recentReviews = [{image:"https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26"},{image:"https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26"},{image:"https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26"},{image:"https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26"},{image:"https://i.scdn.co/image/ab67616d0000b2739bc762efb2fc7252289b2a26"}]
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
                <div class = "row profile d-flex align-content-center">
                    <div class="col-3">
                        <FaUser size={150}/>
                    </div>
                    <div class="col-9">
                        <div class = "list-group">
                            <div class="list-group-item green-text font-semibold">
                                FIRST NAME: 
                                <input className="form-control" value="Aarohi" onChange={(e) => setAccount({ ...account, first_name: e.target.value }) } style={{ display:"inline"}}/>
                                {/* <input className="form-control" value={account.first_name} onChange={(e) => setAccount({ ...account, name: e.target.value }) } style={{ display:"inline"}}/> */}
                            </div>
                            <div class="list-group-item green-text font-semibold">
                                LAST NAME:
                                <input className="form-control" value="Nadkarni" onChange={(e) => setAccount({ ...account, last_name: e.target.value }) } style={{ display:"inline"}}/>
                                {/* <input className="form-control" value={account.last_name} onChange={(e) => setAccount({ ...account, name: e.target.value }) } style={{ display:"inline"}}/> */}
                            </div>
                            <div class="list-group-item green-text font-semibold">
                                BIRTHDAY: 
                                <input className="form-control" type="date" onChange={(e) => setAccount({ ...account, dob: e.target.value }) } style={{ display:"inline"}}/>
                                {/* <input className="form-control" type="date" value={account.dob} onChange={(e) => setAccount({ ...account, dob: e.target.value }) } style={{ display:"inline"}}/> */}
                            </div>
                            <div class="list-group-item green-text font-semibold">
                                EMAIL:
                                <input className="form-control" value="nadkarni.aa@northeastern.edu" onChange={(e) => setAccount({ ...account, email: e.target.value }) } style={{ display:"inline"}}/>
                                {/* <input className="form-control" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value }) } style={{ display:"inline"}}/> */}
                            </div>
                            <div class="list-group-item green-text font-semibold">
                                BIOGRAPHY:
                                <textarea className="form-control" value="blah blah blah" onChange={(e) => setAccount({ ...account, biography: e.target.value }) } style={{ display:"inline"}}/>
                                {/* <textarea className="form-control" value={account.biography} onChange={(e) => setAccount({ ...account, bio: e.target.value }) } style={{ display:"inline"}}/> */}
                            </div>
                            <div class="list-group-item green-text">
                                <Link to="/profile"
                                className="rounded-md no-underline bg-indigo-600 edit-profile-button px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                style={{color: "#333333"}}
                                onClick={save}
                                >
                                SAVE PROFILE
                                </Link>
                                {// need to add like actual changing of user fields in database to this button somehow i don't know how rn
                                }
                            </div>
                        </div>
                    </div>
                        {/* <form id="edit-profile" action="edit.html">
                            <label from="edit-profile-button"></label>
                            <button id="edit-profile-button" type="submit" class="btn btn-secondary btn-sm edit-profile float-end"> <i class="fa fa-pencil-alt pencil"  aria-hidden="true"></i> Edit Profile</button>
                        </form>
                        <span class="fa-stack fa-4x">
                            <i class="fa fa-user fa-stack-1x user" aria-hidden="true"></i>
                            <i class="far fa-circle fa-stack-2x user"></i><br/><br/>
                        </span><br/><br/>
                        <font size="6">Aarohi Nadkarni</font><br/><br/>
                        <font size="5">Contact</font><br/><br/>
                        No registered services, you can add some on the <a href="#">settings</a> page.<br/><br/><br/>
                        <font size="5">Biography</font><br/><br/>
                        Computer Science & Behavioral Neuroscience student.<br/><br/><br/>
                        <font size="5">Links</font><br/><br/>
                        <i class="fas fa-link user" aria-hidden="true"></i>
                        <a href="https://www.youtube.com/@WebDevTV">YouTube</a>
                        <i class="fa fa-external-link-alt" aria-hidden="true"></i> */}
                </div>
                <div class="user-specific-account">
                    <div class="favorite-songs green-text font-semibold">
                        <h4>FAVORITE SONGS</h4>
                        <div class="row">
                            {favorites.map((favorite, index) => (
                                <div key={index} class="col-auto">
                                    <img src={favorite.image} alt="..." width="150" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div class="recent-reviews green-text font-semibold">
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