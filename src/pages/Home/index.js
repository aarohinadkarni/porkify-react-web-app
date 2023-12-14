import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { formatData } from "../spotifyClient";

const editorsPicks = [
  "2dSKFFNoNXKo3hPnlwUdPe",
  "62PaSfnXSMyLshYJrlTuL3",
  "3z63V6OraICzWEyTCcbezn",
  "526fD9LiAEi3KKvhhYfWmm",
  "32OlwWuMpZ6b0aN2RZOeMS",
  "2oRn0QuaWQ1hragGQ7XZ9s",
  "2wGSgTmgSF3xjRrHkTc25R",
  "6ur7NoA7h7ohK25GI2IJva",
  "01lewSOj9ZaXplh9TpNKL4",
  "0XgRWgcs0Pcr9PSIdFWD4N",
];

export function Home() {
  const [tracks, setTracks] = useState(null);
  const { user } = useAuth();

  const getEditorsTracksInfo = async () => {
    const jsonString = JSON.parse(localStorage.getItem("token"));

    var api_url = "https://api.spotify.com/v1/tracks?market=US&ids=";
    for (let i = 0; i < editorsPicks.length; i++) {
      api_url = api_url + editorsPicks[i];
      if (i < editorsPicks.length - 1) {
        api_url = api_url + "%2C";
      }
    }

    try {
      const response = await fetch(`${api_url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jsonString.access_token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.tracks);
        const formattedData = formatData(data.tracks);
        console.log(formattedData, "DATA");
        setTracks(formattedData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getEditorsTracksInfo();
  }, []);

  return (
    <div className=" items-center justify-center flex flex-col">
      <div className="">
        <div
          className="absolute inset-y-0 -z-10 origin-top-right skew-x-[-30deg] bg-white "
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 mt-10 sm:mt-28 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight pink-text sm:text-6xl lg:col-span-2 xl:col-auto">
              Track your favorite music.
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0  ">
              <p className="text-lg leading-8 green-text">
                Want to share reviews of your current favorite (or least
                favorite) songs? Give them a quick rating out of 5, add a
                comment with your thoughts if you have any, and slowly build a
                list of your favorites until you have the perfect playlist.
                Create an account to get started!
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/signup"
                  className="rounded-md no-underline bg-indigo-600 get-started-button px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started →
                </Link>
                {/* <a
                  href="#"
                  className="text-sm font-semibold no-underline leading-6 pink-text"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a> */}
              </div>
            </div>
            {/* <img
              src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
              alt=""
              className="aspect-[6/5] w-full max-w-lg rounded-2xl object-cover lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            /> */}
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-7xl px-6 mt-10 sm:mt-28 lg:px-8">
            <h4 className="max-w-2xl text-xl font-bold tracking-tight pink-text sm:text-6xl lg:col-span-2 xl:col-auto">
              Editors' picks
            </h4>
          </div>

          <div className="sm:flex hidden flex-col gap-3 mt-10 mb-14 px-6 lg:px-8 sm:visible items-center">
            {tracks && (
              <div className="flex gap-5 flex-col">
                <div className="flex gap-3">
                  {[...Array(5)].map((x, i) => (
                    <Card track={tracks[i]} key={i} size={200} />
                  ))}
                </div>
                <div className="flex gap-3">
                  {[...Array(5)].map((x, i) => (
                    <Card track={tracks[i + 5]} key={i} size={200} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sm:hidden flex-col gap-3 mt-14 px-3 sm:px-10 lg:px-12 mb-14">
          {tracks && (
            <div
              className="flex flex-col gap-3 items-center"
              style={{ marginTop: 10 }}
            >
              {[...Array(3)].map((x, i) => (
                <div key={i} className="flex gap-3">
                  {[...Array(3)].map((x, j) => (
                    <Card track={tracks[i * 3 + j]} key={i} size={150} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {user && (
          <div className="mx-auto max-w-7xl px-6 mt-10  lg:px-8">
            <h4 className="max-w-2xl text-xl font-bold tracking-tight pink-text sm:text-6xl lg:col-span-2 xl:col-auto">
              Reviews
            </h4>
            <div className="sm:flex hidden flex-col gap-3 mt-10 mb-14 px-6 lg:px-8 sm:visible items-center"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ track, size }) {
  return (
    <div>
      {track && (
        <div className="">
          {/* <Link to={`/details`}> */}
          <Link to={`/details/${track.id}`} state={{ track: track }}>
            <img
              className="rounded-md hover:opacity-80 hover:cursor-pointer  "
              width={size}
              src={track.album_art_url}
              // src="https://i1.sndcdn.com/artworks-9HEHEhiFEVpP-0-t500x500.jpg"
            ></img>
          </Link>
        </div>
      )}
    </div>
  );
}
