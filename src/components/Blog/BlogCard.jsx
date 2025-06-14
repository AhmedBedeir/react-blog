import avatarImg from "../../assets/images/avatar.png";
import blogImg from "../../assets/images/defaultBlogImg.jpg";
import { badgeStyles } from "../../constants";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/CreateAuthContext";
import apiProtected from "../../api/apiProtected";
import { handleResponseError } from "../../constants";
import { toast } from "react-toastify";
import DeletePostBtn from "./DeletePostBtn";

function BlogCard({
  id,
  title,
  author,
  date,
  tags,
  postImg = blogImg,
  likes: initialLikes,
  onDelete,
}) {
  const navigate = useNavigate();
  const { userData, isAuthenticated } = useContext(AuthContext);
  const [likes, setLikes] = useState(initialLikes || []);

  const isLiked = likes.includes(userData?.id) || false;
  // make optimistic update for likes
  const toggleLike = async () => {
    if (!isAuthenticated()) {
      toast.dismiss();
      toast.error("Please login to like the post.");
      return;
    }
    const snapshotLikes = likes;
    const updatedLikes = isLiked
      ? likes.filter((like) => like !== userData.id)
      : [...likes, userData.id];
    setLikes(updatedLikes);

    try {
      const res = await apiProtected.patch(`/664/posts/${id}`, {
        likes: updatedLikes,
      });
      console.log(res);
    } catch (error) {
      // If the API call fails, revert to the previous state
      setLikes(snapshotLikes);
      toast.dismiss();
      toast.error(handleResponseError(error));
    }
  };

  return (
    <div className="relative flex w-100 flex-col rounded-xl bg-card bg-clip-border  shadow-md">
      {/* blog img */}
      <div className="relative mx-4 -mt-6 h-50 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <img
          src={postImg}
          alt="Blog cover"
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-120"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = blogImg;
          }}
        />
      </div>
      {/* author blog */}
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center">
          <div className="relative h-12 w-12 mx-auto rounded-full shadow-md">
            <img
              src={avatarImg}
              alt="Author"
              className="h-12 w-12 rounded-full border-2 border-white shadow-md object-cover"
            />
            <div className="absolute bottom-0 right-0 text-blue-500 bg-card rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
          </div>
          <span className="ml-3 font-sans text-sm font-semibold text-blue-gray-900 antialiased">
            {author.fullName}
            <br />
            <span className="text-xs font-normal text-blue-gray-600">
              Software Engineer
            </span>
          </span>
        </div>
        <span className="font-sans text-xs font-normal text-blue-gray-600 antialiased">
          {date}
        </span>
      </div>
      {/* blog content */}
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h5>
        {/* <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {content.length > 75 ? content.substring(0, 75) + "..." : content}
        </p> */}
        {/* tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`badge-custom ${
                badgeStyles[index % badgeStyles.length]
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {/* blog action */}
      <div className="p-6 pt-0 flex items-center justify-between">
        <button
          data-ripple-light="true"
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => navigate(`/post/${id}`)}
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </button>
        <div>
          <button
            className={`btn  ${isLiked ? "" : "btn-soft"} btn-info btn-sm ml-2`}
            onClick={toggleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {likes.length}
          </button>
          {userData?.id === author.id && (
            <>
              <button
                onClick={() => navigate(`/post/edit/${id}`)}
                className="btn btn-circle btn-soft btn-info btn-sm ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <DeletePostBtn
                id={id}
                onDelete={() => {
                  onDelete(id);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
