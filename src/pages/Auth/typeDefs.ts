import { gql } from "@apollo/client";

// NOTE: password would be handle in Login.tsx when submitting form
export const USER_FRAGMENT = gql`
  fragment UserFragment on UserModel {
    _id
    access_token
    username
    email
    role
    createdAt
    updatedAt
  }
`

export const LOGIN = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`