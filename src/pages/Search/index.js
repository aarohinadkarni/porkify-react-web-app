import { useEffect, useState } from "react";
import "./index.css";
import { Link, useSearchParams } from "react-router-dom";

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
        setSearchResults(data.tracks.items); // Assuming the track items are in data.tracks.items
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

  return (
    <div className="form-outline align-middle cursor">
      <div className="row">
        <div className="col-11">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search a song..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-1">
          <button
            type="button" // Change to type="button" to prevent form submission
            className="btn text-white btn-md button-submit regular"
            onClick={() => handleSearch(searchTerm)}
          >
            Submit
          </button>
        </div>
      </div>
      <div>
        {/* Display search results */}
        {searchResults.map((track) => (
          <div key={track.id} style={{ marginTop: 20, marginBottom: 20 }}>
            <Link
              to={`/details/${track.id}`}
              state={{ track: track }}
              className="rounded-md no-underline bg-indigo-600 get-started-button px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {track.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
