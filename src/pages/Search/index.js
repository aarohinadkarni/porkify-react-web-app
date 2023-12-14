import { useEffect, useState } from "react";
import "./index.css";
import { Link, useSearchParams } from "react-router-dom";
import { formatData } from "../spotifyClient";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = async (searchTerm) => {
    const test = localStorage.getItem("token");

    const jsonString = JSON.parse(test);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jsonString.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data, "DATA");
        const formattedData = formatData(data.tracks.items);
        console.log(formattedData, "DATA");
        setSearchResults(formattedData); // Assuming the track items are in data.tracks.items
        setSearchParams({ term: searchTerm });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    const term = searchParams.get("term");
    console.log(term);
    if (term) {
      setSearchTerm(term);
      handleSearch(term);
    }
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="form-outline align-middle cursor sm:px-6 lg:px-8 ">
      <div className="flex gap-3 mt-2">
        <div className="grow ">
          <input
            type="search"
            id="form1"
            className="form-control bg-amber-50 active:text-pink  focus:outline-none"
            placeholder="Search a song..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="">
          <button
            type="button" // Change to type="button" to prevent form submission
            className=" text-white rounded-md pl-4 pr-4 pt-2 pb-2 no-underline text-base btn-md button-submit regular bg-purple hover:bg-pink-text"
            onClick={() => handleSearch(searchTerm)}
          >
            Submit
          </button>
        </div>
      </div>
      <div>
        {/* Display search results */}
        {searchResults.map((track) => (
          <div key={track.id}>
            <Link
              to={`/details/${track.id}`}
              state={{ track: track }}
              className="rounded-md no-underline text-sm font-semibold text-white"
            >
              <div className="flex display-inline text-xl gap-4 p-2 mt-2 rounded-md hover:bg-purple/50">
                <img
                  className="rounded-md hover:opacity-80 hover:cursor-pointer  "
                  width={100}
                  src={track.album_art_url}
                ></img>
                <div
                  className="flex"
                  style={{ align: "left", alignItems: "center" }}
                >
                  <div className="flex display-inline text-xl row">
                    <h5 className=" font-bold text-pink-text text-xl">
                      {track.title}
                    </h5>
                    <h6 className="text-sm text-green">
                      By: {track.artists[0]}
                    </h6>
                  </div>
                  {/* <div className="flex display-inline row" style={{ paddingTop:30, fontSize: 6}}>
                    <h6>{track.artists[0].name}</h6>
                  </div> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
