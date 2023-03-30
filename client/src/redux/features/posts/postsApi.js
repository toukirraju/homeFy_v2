import { apiSlice } from "../../api/apiSlice";

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () =>
        `/timeline/posts?_page=1&limit=${process.env.REACT_APP_POSTS_PER_PAGE}`,
    }),
    getMorePosts: builder.query({
      query: (page) =>
        `/timeline/posts?_page=${page}&limit=${process.env.REACT_APP_POSTS_PER_PAGE}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log("getMorePOsts called");
        try {
          const responsedData = await queryFulfilled;
          // console.log(JSON.stringify(responsedData.data));

          if (responsedData.data.posts?.length > 0) {
            // update post cache pessimistically

            dispatch(
              apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
                return {
                  posts: [...draft.posts, ...responsedData.data.posts],
                  totalPosts: Number(responsedData.data.totalPosts),
                };
              })
            );
          }
        } catch (error) {}
      },
    }),
    getRefreshedPosts: builder.query({
      query: () =>
        `/timeline/posts?_page=1&limit=${process.env.REACT_APP_POSTS_PER_PAGE}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const responsedData = await queryFulfilled;

          if (responsedData.data.posts?.length > 0) {
            // update post cache pessimistically

            dispatch(
              apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
                return {
                  ...responsedData.data,
                  // posts: [...responsedData.data.posts],
                  // totalPosts: Number(responsedData.data.totalPosts),
                };
              })
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetMorePostsQuery,
  useGetRefreshedPostsQuery,
} = postsApi;
