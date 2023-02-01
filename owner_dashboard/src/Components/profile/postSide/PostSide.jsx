import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../redux/slices/postSlice";
import Posts from "../../postComponents/posts/Posts";
import "./PostSide.css";

const PostSide = () => {
  const { userPosts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUserPosts());
  }, [dispatch]);
  return (
    <>
      <div className="card headerContainer" style={{ marginBottom: "5px" }}>
        <h3 className="title">All Posts</h3>
        <i className="uil uil-angle-double-up scrollUp__icon"></i>
      </div>
      <div className="PostSide">
        <Posts data={userPosts} />
      </div>
    </>
  );
};

export default PostSide;
