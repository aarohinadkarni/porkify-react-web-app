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
          className="relative sm:space-x-3 cursor-pointer flex flex-col sm:flex-row gap-3 justify-between rounded-lg border-2 border-[#C0EB8F] px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex gap-3 items-center">
            <img
              src={review.album_art_url}
              width={100}
              className=" rounded-md"
            ></img>
            <div className=" gap-3 flex flex-col">
              <div className="text-sm font-medium">{user.username}</div>
              <div className="truncate text-sm">{review.body}</div>
            </div>
          </div>
          <Rating defaultValue={review.rating} readOnly={true} />
        </div>
      </Link>
    </div>
  );
}
