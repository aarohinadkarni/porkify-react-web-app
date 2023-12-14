import { useEffect } from "react";
import { Rating } from "react-custom-rating-component";
import { Link } from "react-router-dom";
export function Review({ data: { song, review, user } }) {
  return (
    <div>
      {/* <div className=" bg-white px-5">
        <div>{review.body}</div>
        <div>{review.rating}</div>
        <div>{review.user_id}</div>
      </div> */}
      <Link
        className="no-underline text-[#c0eb8f]"
        state={{ track: song }}
        to={`/details/${song.spotify_id}`}
      >
        <div
          key={review.user_id}
          className="relative sm:space-x-3  cursor-pointer flex flex-col sm:flex-row gap-3 justify-between rounded-lg border-2 border-[#C0EB8F] px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-pink-text"
        >
          <div className="flex gap-4 items-center">
            <img
              src={song.album_art_url}
              width={100}
              className=" rounded-md"
            ></img>
            <div className=" gap-3 flex flex-col">
              <div className="text-lg font-bold">
                <span className="text-base font-normal">Review by</span>{" "}
                <Link
                  className="no-underline  text-pink-text hover:text-purple"
                  to={`/profile/${review.user_id}`}
                >
                  {user.username}
                </Link>
              </div>
              <div className="text-xs sm:text-base break-normal">
                {review.body}
              </div>
            </div>
          </div>
          <Rating
            defaultValue={review.rating}
            readOnly={true}
            activeColor="#eb8fcc"
          />
        </div>
      </Link>
    </div>
  );
}
