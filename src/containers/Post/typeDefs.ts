import { gql } from "@apollo/client";
import { BATCH_DELETE_FRAGMENT } from "../../graphql/fragment";

/**
 *  note:
 *  outter: mutation CreatePost() {} -> CreatePost is the function return by useMutation
 *  inner : createPost() {}          -> createPost is the gql filed (should refer to gql playground from gql server)
 *  params: $input: CreatePostInput! -> $variable Name : Variable Type (should refer to gql playground from gql server)
 */

const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    _id
    posterUrl
    title
    summary
    content
    tags
    lastModifiedDate
    like
    pv
    isPublic
    createdAt
    updatedAt
  }
`;

export const CREATE_ONE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
export const UPDATE_ONE_POST = gql`
  mutation UpdatePostById($input: UpdatePostInput!) {
    updatePostById(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const POSTS = gql`
  query GetPosts($input: PaginationInput!) {
    getPosts(input: $input) {
      total
      page
      pageSize
      items {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const DELETE_ONE_POST = gql`
  mutation DeletePostById($id: ID!) {
    deletePostById(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const BATCH_DELETE_POST = gql`
  mutation DeletePosts($ids: [ID!]!) {
    deletePosts(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`;
export const GET_TOP_PV_POSTS = gql`
  query GetTopPVPosts($limit: Int!) {
    getTopPVPosts(limit: $limit) {
      _id
      title
      posterUrl
      pv
    }
  }
`;
export const GET_TOP_LIKE_POSTS = gql`
  query GetTopLikePosts($limit: Int!) {
    getTopLikePosts(limit: $limit) {
      _id
      title
      posterUrl
      like
    }
  }
`;
export const GET_ALL_TAGS = gql`
  query {
    getAllTags {
      tags
    }
  }
`;



// TODO
// export const GET_POST_STATISTICS = gql``;
// export const CREATE_POST_STATISTICS = gql``;
