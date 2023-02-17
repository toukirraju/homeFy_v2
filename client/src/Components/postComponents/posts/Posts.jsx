import React, { useEffect, useRef, useState } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTimelinePosts, resetPosts } from "../../../redux/slices/postSlice";
import ActionButton from "../../UI/ActionButtons/ActionButton";
import { Loader } from "@mantine/core";
import { UilRedo, UilArrowCircleUp } from "@iconscout/react-unicons";

const Posts = () => {
  const dispatch = useDispatch();

  const [refreshButton, setrefreshButton] = useState(false);

  const { posts, status, error, hasMore, lastPostId, limit } = useSelector(
    (state) => state.posts
  );

  // get some post for first render
  useEffect(() => {
    dispatch(getTimelinePosts({ limit, lastPostId }));

    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch]);

  //  after scrolling load more  post
  const loadMorePosts = () => {
    if (status === "succeeded" && hasMore) {
      dispatch(getTimelinePosts({ limit, lastPostId }));
    }
  };

  //set back to top and refresh button
  useEffect(() => {
    function handleScroll() {
      if (document.querySelector("#scrollableDiv").scrollTop < 600) {
        setrefreshButton(true);
      } else {
        setrefreshButton(false);
      }
    }

    document
      .querySelector("#scrollableDiv")
      .addEventListener("scroll", handleScroll);
  }, []);

  //refresh post
  const onRefresh = async () => {
    dispatch(resetPosts());
    await dispatch(getTimelinePosts({ limit: 4, lastPostId: null }));
  };

  if (status === "loading" && posts.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader color="cyan" variant="dots" />
      </div>
    );
  }

  if (status === "failed" && posts.length === 0) {
    return <div>{error}</div>;
  }

  const scrollToTop = () => {
    document.querySelector("#scrollableDiv").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="scrollableDiv" className="Posts">
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Loader color="cyan" />
          </div>
        }
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={onRefresh}
        pullDownToRefresh={true}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
        scrollThreshold="200px"
        pullDownToRefreshThreshold={50}
      >
        {posts.map((post, index) => (
          <div key={index}>
            <Post data={post} />
          </div>
        ))}
      </InfiniteScroll>

      {refreshButton ? (
        <ActionButton icon={<UilRedo />} onClick={onRefresh} />
      ) : (
        <ActionButton icon={<UilArrowCircleUp />} onClick={scrollToTop} />
      )}
    </div>
  );
};

export default Posts;
