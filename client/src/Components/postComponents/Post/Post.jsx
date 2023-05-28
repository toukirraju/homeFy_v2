/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  UilHouseUser,
  UilPhoneAlt,
  UilMapMarker,
} from "@iconscout/react-unicons";
import "./Post.css";

import Email from "../../../assets/email.png";
import Chat from "../../../assets/send.png";
import Call from "../../../assets/phone-call.png";

import PostImages from "./PostImages";
import { useState } from "react";
import SendMessageModal from "../../../pages/message/modals/SendMessageModal";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Post = ({ data }) => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  const [ownerUsername, setOwnerUsername] = useState(null);
  const handleMessage = (value) => {
    if (isLoggedIn) {
      setModalOpened(true);
      setOwnerUsername(value?.username);
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className="Post">
      {data?.images.length !== 0 && <PostImages images={data?.images} />}

      <div className="postDetails">
        {/*************************  apartment details section start *************************/}
        <div className=" Post__innerCard">
          <h4 className="Post_innerCard_title">Apartment Details </h4>
          <div className="Post__innerCard__container">
            <div className="container__body">
              <div className="content">
                <span>Floor </span>
                <span>{data.apartment.apartmentDetails.floor}</span>
              </div>
              <div className="content">
                <span>Apartment number </span>
                <span>{data.apartment.apartmentDetails.apartment_number}</span>
              </div>
              <div className="content">
                <span>Apartment Type </span>
                <span>{data.apartment.apartmentDetails.apartmentType}</span>
              </div>
              <div className="content">
                <span>Bed room </span>
                <span>
                  {data.apartment.apartmentDetails.number_of_bed_room}
                </span>
              </div>
            </div>
            <div className="container__body">
              <div className="content">
                <span>Kitchen </span>
                <span>{data.apartment.apartmentDetails.number_of_kitchen}</span>
              </div>
              <div className="content">
                <span>Baths </span>
                <span>{data.apartment.apartmentDetails.number_of_baths}</span>
              </div>
              <div className="content">
                <span>Balcony </span>
                <span>{data.apartment.apartmentDetails.number_of_balcony}</span>
              </div>
              <div className="content">
                <span>Apartment length </span>
                <span>{data.apartment.apartmentDetails.apartment_length}</span>
              </div>
            </div>
          </div>
        </div>
        {/*************************  apartment details section End *************************/}

        {/*************************  Bill details section start *************************/}

        {!data.isNegotiable ? (
          <>
            <div className=" Post__innerCard">
              <h4 className="Post_innerCard_title">Bill Details </h4>
              <div className="Post__innerCard__container">
                <div className="container__body">
                  <div className="content">
                    <span>Rent </span>
                    <span>{data.apartment.billDetails.rent}</span>
                  </div>
                  <div className="content">
                    <span>Gas bill </span>
                    <span>{data.apartment.billDetails.gas_bill}</span>
                  </div>
                  <div className="content">
                    <span>Water bill </span>
                    <span>{data.apartment.billDetails.water_bill}</span>
                  </div>
                  <div className="content">
                    <span>Service charge </span>
                    <span>{data.apartment.billDetails.service_charge}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="negotiable_message">Bills can be negotiated</h3>
          </>
        )}

        {/*************************  Bill details section End *************************/}
        <div className="text-justify dark:text-gray-300 flex justify-center py-3">
          {data.description}
        </div>
        {/*************************  House details section start *************************/}
        <div className=" Post__innerCard">
          <div className="Post__innerCard__container">
            <h2 className="innerCard__title">{data.house.houseName}</h2>
            <h4 className="innerCard__subtitle">
              <UilMapMarker /> {data?.address?.address_display_name}
            </h4>
            <div className="owner__container__body">
              <div className="owner_content">
                <span>
                  <UilHouseUser />
                </span>
                <span>{data.house.ownerName}</span>
              </div>
              <div className="owner_content">
                <span>
                  <UilPhoneAlt />{" "}
                </span>
                <span>{data.house.ownerPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*************************  Button section start *************************/}
      <div className="postReact">
        <div>
          <a href={`tel:+88${data?.house?.ownerPhone}`}>
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
          ></span>
        </div>

        {/* <div>
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
          </span>
        </div> */}

        <img
          src={Chat}
          onClick={() => handleMessage(data?.owner)}
          style={{ height: "30px", cursor: "pointer" }}
          alt=""
        />
      </div>
      {ownerUsername && (
        <SendMessageModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          ownerUsername={ownerUsername}
        />
      )}
    </div>
  );
};

export default Post;
