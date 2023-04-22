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

const Post = ({ data }) => {
  return (
    <div className={data.isVisible ? "Post" : "Inactive__Post"}>
      {data?.images.length !== 0 && <PostImages images={data?.images} />}

      {/* <>
        <div className="grid grid-cols-3 gap-4">
          {data?.images?.map((image, index) => (
            <Image
              key={index}
              src={image.secure_url}
              alt={`Image ${index}`}
              className={` cursor-pointer rounded-lg ${
                index === 0 ? "col-span-2 row-span-2" : "col-span-1  row-span-1"
              }`}
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        <Modal
          classNames={{
            modal: `modal__Body`,
            title: `modal__title`,
            close: `modal__close`,
          }}
          size="lg"
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className="relative  w-full ">
            <Image
              fit="contain"
              radius="md"
              src={data?.images[currentImageIndex].url}
              alt={data?.images[currentImageIndex].alt}
            />
            <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-between ">
              <span className="flex  h-14 w-14 cursor-pointer items-center justify-center rounded-full  bg-slate-300 bg-opacity-20  hover:bg-opacity-70">
                <UilAngleLeftB onClick={prevImage} />
              </span>
              <span className="flex h-14  w-14 cursor-pointer items-center justify-center rounded-full bg-slate-300 bg-opacity-20  hover:bg-opacity-70">
                <UilAngleRightB onClick={nextImage} />
              </span>
            </div>
          </div>
        </Modal>
      </> */}

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
        <div className="postDescription">
          {data.description}
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

export default Post;
