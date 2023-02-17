import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
// import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../../redux/slices/postSlice";

const Posts = ({ data }) => {
  // const { user } = useSelector((state) => state.authReducer.authData);

  // if (!posts) return "no posts";
  // if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {data.map((post, idx) => (
        <>
          <Post key={idx} data={post} />
        </>
      ))}

      {/* {loading
        ? "Loading post..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })} */}
    </div>
  );
};

export default Posts;
