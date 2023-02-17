import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificHousePosts } from "../../../redux/slices/postSlice";
import Posts from "../../postComponents/posts/Posts";
import "./PostSide.css";
// import { postData } from "../../../assets/Data";

const PostSide = () => {
  const dispatch = useDispatch();
  const { specificPosts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getSpecificHousePosts());
  }, [dispatch]);
  return (
    <>
      <div className="card headerContainer" style={{ marginBottom: "5px" }}>
        <h3 className="title">All Posts</h3>
        <i className="uil uil-angle-double-up scrollUp__icon"></i>
      </div>
      <div className="PostSide">
        {specificPosts.length !== 0 && <Posts data={specificPosts} />}
      </div>
    </>
  );
};

export default PostSide;
