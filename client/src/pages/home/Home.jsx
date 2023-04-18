import HomeStyle from "./styles/Home.module.css";
import RightNavBar from "../../Components/navigationBar/RightNavBar";
import PostSearchBar from "./components/Left__Side/PostSearchBar";
import ProfileCard from "../profile/components/profileCard/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import LeftTitleHeader from "../../Components/leftSide/LeftTitleHeader";
import { useMediaQuery } from "@mantine/hooks";
import Posts from "../../Components/postComponents/posts/Posts";
import CustomMap from "../../Components/UI/CustomMap/CustomMap";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/features/posts/postSlice";
import useAuth from "../../hooks/useAuth";
import PostLoader from "../../Components/loader/PostLoader";
import ErrorMessage from "../../Components/UI/Error/ErrorMessage";
const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const isLoggedIn = useAuth();
  const { postResponse, isLoading, isError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  let content = null;
  if (isLoading && !isError) {
    content = (
      <>
        <PostLoader />
        <PostLoader />
        <PostLoader />
        <PostLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <h4>Somthing want wrong!</h4>;
  }

  if (!isLoading && !isError && postResponse?.posts?.length === 0) {
    content = <h3>Post not found</h3>;
  }
  if (!isLoading && !isError && postResponse?.posts?.length > 0) {
    content = (
      <Posts
        posts={postResponse?.posts}
        totalPosts={postResponse?.totalPosts}
      />
    );
  }
  return (
    <>
      <div className={` ${HomeStyle.homeWrapper}`}>
        <div className={HomeStyle.leftSide__wrapper}>
          {/* left header */}
          <LeftTitleHeader />
          {/*post search component */}
          <div className={`${HomeStyle.leftSide__container}`}>
            <PostSearchBar />
          </div>
          {/* Map  */}
          {!isMobile && <CustomMap />}
        </div>
        <div className={HomeStyle.postSide__wrapper}>
          {/* Post Side */}
          {/* <ErrorMessage /> */}
          {content}
        </div>
        <div className={HomeStyle.rightSide__wrapper}>
          {/* right side */}
          <RightNavBar />
          {/* right profile card */}
          {!isMobile && isLoggedIn && <ProfileCard />}
        </div>
      </div>
    </>
  );
};

export default Home;
