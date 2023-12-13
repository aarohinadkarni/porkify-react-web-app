import { Rating } from "react-custom-rating-component";
export function Review({ review }) {
  return (
    <div>
      {/* <div className=" bg-white px-5">
        <div>{review.body}</div>
        <div>{review.rating}</div>
        <div>{review.user_id}</div>
      </div> */}
      <div
        key={review.user_id}
        className="relative space-x-3 flex justify-between rounded-lg border-2 border-[#C0EB8F] px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
      >
        <div className=" gap-3 flex flex-col">
          <div className="text-sm font-medium">{review.user_id}</div>
          <div className="truncate text-sm">{review.body}</div>
        </div>
        <Rating defaultValue={review.rating} />
      </div>
    </div>
  );
}
