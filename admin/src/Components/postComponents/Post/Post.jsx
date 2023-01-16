import React, { useState } from "react";
import "./Post.css";
import Comment from "../../../assets/comment.png";
import Share from "../../../assets/share.png";
import Heart from "../../../assets/like.png";
import logo from "../../../assets/Billfactor3.png";
// import { useSelector } from "react-redux";
// import { likePost } from "../../Api/PostRequest";

const Post = ({ data }) => {
  // const { user } = useSelector((state) => state.authReducer.authData);

  // const [liked, setLiked] = useState(data.likes.includes(user._id));
  // const [likes, setLikes] = useState(data.likes.length);

  // const handleLike = () => {
  //   setLiked((prev) => !prev);
  //   likePost(data._id, user._id);
  //   liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  // };
  return (
    <div className="Post">
      <img src={logo} alt="" />

      <div className="postDetails">
        <div className="postDescription">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          minus, alias architecto eius labore modi fugit, quaerat, eum eaque
          nostrum libero. Eos sint quos esse, quidem expedita placeat
          perspiciatis alias!
        </div>

        <div className="apartmentDetail">
          <h4>Apartment Details: </h4>
          <div>
            <div className="subtitle">
              <b>Level:</b> {data.level}
            </div>
            <div className="subtitle">
              <b>Rent:</b> {data.rent}
            </div>
            <div className="subtitle">
              <b>Gas bill:</b> {data.gasbill}
            </div>
            <div className="subtitle">
              <b>Water bill:</b> {data.waterbill}
            </div>
            <div className="subtitle">
              <b>Service charge:</b> {data.c_service}
            </div>
          </div>
        </div>
        <div className="homeInfo">
          <h4>House Info: </h4>
          <div className="ownerInfo">
            <span>Name: Toukir Ahmad (owner)</span>
            <span>Phone No: 01909303013</span>
          </div>
          <div className="location">
            <span>
              <b>Location:</b> 241/1, Laxmipura, Joydebpur, Gazipur
            </span>
          </div>
        </div>
      </div>
      <div className="postReact">
        <div>
          <img
            src={Heart}
            alt=""
            style={{ cursor: "pointer" }}
            // onClick={handleLike}
          />
          <span
            style={{
              color: "var(--gray)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            500 likes
          </span>
        </div>

        <div>
          <img src={Comment} alt="" />
          <span
            style={{
              color: "var(--gray)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            1.5k comments
          </span>
        </div>

        <img src={Share} alt="" />
      </div>
    </div>
  );
};

export default Post;
