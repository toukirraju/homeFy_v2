import HomeStyle from "./styles/Home.module.css";
import RightNavBar from "../../Components/navigationBar/RightNavBar";
import PostSearchBar from "./components/Left__Side/PostSearchBar";
import ProfileCard from "../profile/components/profileCard/ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import LeftTitleHeader from "../../Components/leftSide/LeftTitleHeader";
import { useMediaQuery } from "@mantine/hooks";
import Posts from "../../Components/postComponents/posts/Posts";
const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className={`noselect ${HomeStyle.homeWrapper}`}>
        <div className={HomeStyle.leftSide__wrapper}>
          {/* header */}
          <LeftTitleHeader />
          {/* search component */}
          <div className={`${HomeStyle.leftSide__container}`}>
            <PostSearchBar />
          </div>
        </div>
        <div className={HomeStyle.postSide__wrapper}>
          {/* Post Side */}

          <Posts />
        </div>
        <div className={HomeStyle.rightSide__wrapper}>
          {/* right side */}
          <RightNavBar />
          {!isMobile && user && <ProfileCard />}
        </div>
      </div>
    </>
  );
};

export default Home;
