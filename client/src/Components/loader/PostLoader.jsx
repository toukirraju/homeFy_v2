import {
  UilHouseUser,
  UilPhoneAlt,
  UilMapMarker,
} from "@iconscout/react-unicons";
import "../postComponents/Post/Post.css";

import Email from "../../assets/email.png";
import Chat from "../../assets/send.png";
import Call from "../../assets/phone-call.png";

import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image5 from "../../assets/image5.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";

// import ImageCollage from "../../imageCollage/ImageCollage";

const PostLoader = () => {
  const images = [
    {
      src: image1,
      width: 220,
      height: 100,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: image2,
      width: 120,
      height: 100,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" },
      ],
      alt: "Boats (Jeshu John - designerspics.com)",
    },

    {
      src: image3,
      width: 120,
      height: 100,
    },
    {
      src: image4,
      width: 220,
      height: 100,
    },
  ];
  return (
    <div className="Post">
      {/* {data && <ImageCollage data={images} />} */}
      <div
        style={{
          height: "200px",
          width: "100%",
          //   background: "lightgray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "300px",
            display: "flex",
          }}
        >
          <span
            style={{ height: "100%", width: "100%" }}
            className="skeleton"
          ></span>
        </div>
        <div
          style={{
            height: "100px",
            width: "200px",
            background: "lightgray",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ height: "100%", width: "100%" }}
            className="skeleton"
          ></span>
        </div>
        <div
          style={{
            height: "100px",
            width: "170px",
            background: "lightgray",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ height: "100%", width: "100%" }}
            className="skeleton"
          ></span>
        </div>
        <div
          style={{
            height: "100px",
            width: "150px",
            background: "lightgray",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ height: "100%", width: "100%" }}
            className="skeleton"
          ></span>
        </div>
        <div
          style={{
            height: "100px",
            width: "170px",
            background: "lightgray",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ height: "100%", width: "100%" }}
            className="skeleton"
          ></span>
        </div>
      </div>

      <div className="postDetails">
        {/*************************  apartment details section start *************************/}
        <div className=" Post__innerCard">
          <h4 className="Post_innerCard_title">Apartment Details </h4>
          <div className="Post__innerCard__container">
            <div className="container__body">
              <div className="content">
                <span>Floor </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Apartment number </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Apartment Type </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Bed room </span>

                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
            </div>
            <div className="container__body">
              <div className="content">
                <span>Kitchen </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Baths </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Balcony </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Apartment length </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
            </div>
          </div>
        </div>
        {/*************************  apartment details section End *************************/}

        {/*************************  Bill details section start *************************/}

        <div className=" Post__innerCard">
          <h4 className="Post_innerCard_title">Bill Details </h4>
          <div className="Post__innerCard__container">
            <div className="container__body">
              <div className="content">
                <span>Rent </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Gas bill </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Water bill </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="content">
                <span>Service charge </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/*************************  Bill details section End *************************/}
        <div className="postDescription">
          <span
            style={{ height: "10px", width: "80%" }}
            className="skeleton"
          ></span>
          <span
            style={{ height: "10px", width: "80%" }}
            className="skeleton"
          ></span>
          <span
            style={{ height: "10px", width: "80%" }}
            className="skeleton"
          ></span>
          <span
            style={{ height: "10px", width: "80%" }}
            className="skeleton"
          ></span>
          {/* A customer shared two recorded demos with me, each 1-hour long,
            presented to their typical prospects. These two examples had the same
            storyline and the only difference between them was the verbal style of
            delivery. The content and the sequence of steps in each demo were
            exactly alike. We had scheduled for me to see one more demo, but this
            one was live. */}
        </div>
        {/*************************  House details section start *************************/}
        <div className=" Post__innerCard">
          <div className="Post__innerCard__container">
            <span
              style={{ height: "10px", width: "80%" }}
              className="skeleton"
            ></span>
            <h4 className="innerCard__subtitle">
              <UilMapMarker />{" "}
              <span
                style={{ height: "10px", width: "80%" }}
                className="skeleton"
              ></span>
            </h4>
            <div className="owner__container__body">
              <div className="owner_content">
                <span>
                  <UilHouseUser />
                </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
              <div className="owner_content">
                <span>
                  <UilPhoneAlt />{" "}
                </span>
                <span
                  style={{ height: "10px", width: "80%" }}
                  className="skeleton"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*************************  Button section start *************************/}
      <div className="postReact">
        <div>
          <a>
            <img
              src={Call}
              alt=""
              style={{ height: "30px", cursor: "pointer" }}
              // onClick={handleLike}
            />
          </a>
          <span
            style={{
              color: "var(--gray)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            {/* 500 likes */}
          </span>
        </div>

        <div>
          <img
            src={Email}
            style={{ height: "30px", cursor: "pointer" }}
            alt=""
          />
          <span
            style={{
              color: "var(--gray)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            {/* 1.5k comments */}
          </span>
        </div>

        <img src={Chat} style={{ height: "30px", cursor: "pointer" }} alt="" />
      </div>
    </div>
  );
};

export default PostLoader;
