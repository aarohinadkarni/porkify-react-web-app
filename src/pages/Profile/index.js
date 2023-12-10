import "./index.css"
import * as client from "./client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";


export function Profile() {
    const { user } = useAuth();
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
    if (!user) {
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
                            <div class="list-group-item green-text">
                                <font size="5">[GET NAME FROM SESSION LOOK AT JOSE REPO]</font>
                            </div>
                            <div class="list-group-item green-text">
                                [BIRTHDAY]
                            </div>
                            <div class="list-group-item green-text">
                                [EMAIL]
                            </div>
                            <div class="list-group-item green-text">
                                [BIO]
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
                    <div class = "row favorite-songs d-flex green-text">
                            <font size="4">FAVORITE SONGS</font>
                            <div class="">
                                [MAPPING OF FAVORITE SONGS TO LITTLE CARDS?]
                            </div>
                    </div>
                    <div class = "row recent-reviews d-flex green-text">
                            <font size="4">RECENT REVIEWS</font>
                            <div class="">
                                [MAPPING OF RECENT REVIEWS TO LITTLE CARDS?]
                            </div>
                    </div>
                </div>
                <a
                  href="/profile/edit"
                  className="rounded-md no-underline bg-indigo-600 edit-profile-button px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit profile
                </a>
            </div>
        );
    } 
    // else {
    //     return (
    //         <div class="container porkify-navigation">
    //         <div className="row">
    //             <div className="porkify-nav-heading p-flex-row-container d-flex align-items-start col-md-6 col-12">
    //             <img
    //                 className="d-none d-md-block"
    //                 src={porkify}
    //                 style={{ width: 40 }}
    //                 alt="porkify logo"
    //             />
    //             &nbsp;
    //             <Link to={`/Home`} className="d-none d-md-block">
    //                 <h1>PORKIFY</h1>
    //             </Link>
    //             </div>
    //             <div className="p-nav-bar list-group list-group-horizontal d-flex align-items-start col-md-6 col-12 justify-content-end">
    //             {links_logged_in.map((link, index) => (
    //                 <Link
    //                 key={index}
    //                 to={`/${link}`}
    //                 className={`list-group-item border-0 ${
    //                     pathname.includes(link) && "active"
    //                 }`}
    //                 style={{ whiteSpace: "nowrap" }}
    //                 >
    //                 {link}
    //                 </Link>
    //             ))}
    //             </div>
    //         </div>
    //         </div>
    //     );
    // }
}
