import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";
import PostTable from "./PostTable";
import { GET_ALL_TAGS, POSTS, UPDATE_ONE_POST } from "./typeDefs";




function Post() {
  const [fetchPostsByPage, { loading, data }] = useLazyQuery(POSTS, { notifyOnNetworkStatusChange: true })
  // const {loading, error, data } = useQuery(GET_ALL_TAGS);
  const [updatePostById] = useMutation(UPDATE_ONE_POST)

  const fetchInitData = useCallback(() => {
    fetchPostsByPage({
      variables: {
        input: {
          page: 1,
          pageSize: 10,
        }
      }
    })
  }, [fetchPostsByPage])


  useEffect(() => {
    fetchInitData()
  }, [fetchInitData])


  return (
    <PostTable
      dataSource={data ? data.getPosts.items : []}
      updatePostById={updatePostById}
      isFetching={loading}
    />
  );
}

export default Post;
