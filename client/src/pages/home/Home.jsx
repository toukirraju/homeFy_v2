import HomeStyle from "./styles/Home.module.css";
import logo from "../../assets/homeFylogo.png";
// import {
//   UilSearch,
//   UilScenery,
//   UilPlayCircle,
//   UilLocationPoint,
//   UilSchedule,
//   UilEstate,
//   UilBell,
//   UilMessage,
//   UilSignOutAlt,
// } from "@iconscout/react-unicons";
// import PostShare from "../../components/postComponents/postShare/PostShare";
// import RightSide from "../../components/profile/rightSide/RightSide";
import RightNavBar from "../../Components/navigationBar/RightNavBar";
// import MessageModal from "../components/Right__Side/MessageModal";
import PostSearchBar from "./components/Left__Side/PostSearchBar";
import Posts from "../../Components/postComponents/posts/Posts";
import ProfileCard from "../profile/components/profileCard/ProfileCard";
import { useSelector } from "react-redux";
import LeftTitleHeader from "../../Components/leftSide/LeftTitleHeader";
import { useMediaQuery } from "@mantine/hooks";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const post = [
    {
      _id: "631c5b8245900ef010173ff7",
      ownerId: "6316ef008d0db66e2ddb0cfb",
      desc: "3rd post",
      isVisible: true,
      comments: { isVisible: true },
      createdAt: { $date: { $numberLong: "1663408021502" } },
      updatedAt: { $date: { $numberLong: "1663408021502" } },
      __v: { $numberInt: "0" },
    },
    {
      _id: "631c5b8245900ef010173ff7",
      ownerId: "6316ef008d0db66e2ddb0cfb",
      desc: "3rd post",
      isVisible: true,
      comments: { isVisible: true },
      createdAt: { $date: { $numberLong: "1663408021502" } },
      updatedAt: { $date: { $numberLong: "1663408021502" } },
      __v: { $numberInt: "0" },
    },
    {
      _id: "631c5b8245900ef010173ff7",
      ownerId: "6316ef008d0db66e2ddb0cfb",
      desc: "3rd post",
      isVisible: true,
      comments: { isVisible: true },
      createdAt: { $date: { $numberLong: "1663408021502" } },
      updatedAt: { $date: { $numberLong: "1663408021502" } },
      __v: { $numberInt: "0" },
    },
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className={HomeStyle.homeWrapper}>
        <div className={HomeStyle.leftSide__wrapper}>
          {/* header */}
          <LeftTitleHeader />
          {/* search component */}
          <div className={`${HomeStyle.leftSide__container}`}>
            <PostSearchBar />
            {!isMobile && user && <ProfileCard />}
          </div>
        </div>
        <div className={HomeStyle.postSide__wrapper}>
          {/* Post Side */}
          <Posts data={post} />
        </div>
        <div className={HomeStyle.rightSide__wrapper}>
          {/* right side */}
          <RightNavBar />
        </div>
      </div>
    </>
  );
};

export default Home;
