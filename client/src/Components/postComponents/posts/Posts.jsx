import React, { useEffect, useRef, useState } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import ActionButton from "../../UI/ActionButtons/ActionButton";
import { Loader } from "@mantine/core";
import { UilRedo, UilArrowCircleUp } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import {
  fetchMorePosts,
  fetchPosts,
} from "../../../redux/features/posts/postSlice";

const Posts = ({ posts, totalPosts }) => {
  const dispatch = useDispatch();
  const [refreshButton, setrefreshButton] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  //  after scrolling load more  post
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchMorePosts(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (totalPosts > 0) {
      const more =
        Math.ceil(totalPosts / Number(process.env.REACT_APP_POSTS_PER_PAGE)) >
        page;
      setHasMore(more);
    }
  }, [totalPosts, page]);

  //refresh post
  const onRefresh = async () => {
    setPage(1);
    await dispatch(fetchPosts());
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

  const scrollToTop = () => {
    document.querySelector("#scrollableDiv").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="scrollableDiv" className="Posts">
      <InfiniteScroll
        // key={posts.length}
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Loader color="cyan" />
            {/* <b>Not more posts available</b> */}
          </div>
        }
        scrollableTarget="scrollableDiv"
        endMessage={
          <p
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            <b>Not more posts available</b>
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
